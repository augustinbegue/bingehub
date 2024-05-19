import { readdir, lstat } from "fs/promises";
import { join } from "node:path";
import { log } from "../logger";
import { TVDB, TVDBArtwork } from "../../../lib/server/tvdb";
import { prisma } from "../../../lib/server/database/prisma";
import { fetchImageDataUrl } from "../../../lib/utils/fetchImageDataUrl";
import { MediaType, PostSubType, PostType } from "@prisma/client";

export async function importNewMedia() {
    const libraryPath = process.env.BH_LIBRARY_PATH;
    const excludedKeywords = process.env.BH_EXCLUDED_KEYWORDS.split(",").map((k) => k.toLowerCase()) || [];
    const extensions = process.env.BH_EXTENSIONS.split(",") || [];

    if (!libraryPath) {
        log.error("Library path not set");
        return;
    }

    if (!extensions.length) {
        log.error("Extensions not set");
        return;
    }

    const files = await readdir(libraryPath);
    console.log(files);

    const paths = files.map((f) => join(libraryPath, f));

    const res: {
        [key: string]: {
            title: string;
            path: string;
            season: number;
            episode: number;
            size: number;
        }[] | {
            title: string;
            path: string;
            year: number;
            size: number;
        };
    } = {};

    // Library Traversal
    for (const path of paths) {
        const stat = await lstat(path);
        log.info(`Scanning '${path}'`);

        if (stat.isDirectory()) {
            const newFiles = await readdir(path);
            paths.push(...newFiles.map((f) => join(path, f)));
        }
        else if (stat.isFile() && extensions.includes(path.split(".").pop())) {
            const filename = path.replace(/\\/g, "/").split("/").pop().split(".").slice(0, -1).join(".").replace(/[\s-_]/g, ".");
            // eslint-disable-next-line no-useless-escape
            let matches = filename.match(/([\w*\.]*)S([\d]{1,2})EP?([\d]{1,2})/i);

            if (matches) {
                // series
                const title = matches[1].replace(/\./g, " ").trim();
                const season = parseInt(matches[2]);
                const episode = parseInt(matches[3]);

                if (!isNaN(season) && !isNaN(episode)) {
                    res[title.toLowerCase()] = res[title.toLowerCase()] || [];

                    if (Array.isArray(res[title.toLowerCase()])) {
                        const arr = <{
                            title: string;
                            path: string;
                            season: number;
                            episode: number;
                            size: number;
                        }[]>res[title.toLowerCase()];

                        arr.push({
                            title,
                            path,
                            season,
                            episode,
                            size: stat.size
                        });
                    } else {
                        console.error("Conflict between a movie and a series", { title, path, season, episode });
                    }

                    continue;
                }
            }

            // other
            matches = filename.match(/(.*)(\d{4}).*(\d{4}p)/i);

            if (!matches) {
                matches = filename.match(/(.*)(\d{4})/i);
            }

            if (matches) {
                // eslint-disable-next-line no-useless-escape
                const title = matches[1].replace(/[\.\(]/g, " ").trim();
                const year = parseInt(matches[2]);

                if (!isNaN(year)) {
                    res[title.toLowerCase()] = {
                        title,
                        path,
                        year,
                        size: stat.size
                    };
                }
            }
        }
    }

    const tvdb = await TVDB.getInstance();
    const result: ({
        title: string;
        slug: string;
        overview: string;
        path: string;
        poster?: TVDBArtwork;
        backdrop?: TVDBArtwork;
        size: number;
        type: "movie";
    } | {
        title: string;
        slug: string;
        overview: string;
        poster?: TVDBArtwork;
        backdrop?: TVDBArtwork;
        type: "series";
        episodes: {
            name: string;
            season: number;
            episode: number;
            overview: string;
            image: string;
            path: string;
            size: number;
        }[]
    })[] = [];

    // Data Enrichment with TVDB
    for (const [key, data] of Object.entries(res)) {
        if (excludedKeywords.some((k) => key.includes(k))) {
            log.info(`Excluded '${key}'`);
            continue;
        }

        const type = Array.isArray(data) ? "series" : "movie";

        const tvdbData = (await tvdb.search(key, {
            limit: 1,
            type: type
        })).data;

        if (!tvdbData || !tvdbData.length) {
            log.error(`No match found for '${key}', type: ${type}`);
            continue;
        }
        else
            log.info(`Match found for '${key}': ${tvdbData[0].id}, type: ${type}`);

        if (Array.isArray(data)) {
            const tvdbSeries = (await tvdb.getSeries(parseInt(tvdbData[0].id.split('-')[1])));
            const tvdbEpisodes = (await tvdb.getSeriesEpisodes(tvdbSeries.id)).episodes;

            const title = tvdbSeries.name;
            const slug = `${tvdbSeries.slug}`
            const overview = tvdbData[0].overview;
            const poster = tvdbSeries.artworks.find((a) => a.type === 2);
            const backdrop = tvdbSeries.artworks.find((a) => a.type === 3);

            const episodes = data.map((e) => {
                const season = e.season;
                const episode = e.episode;
                const tvdbEpisode = tvdbEpisodes.find((e) => e.seasonNumber === season && e.number === episode);

                if (!tvdbEpisode) {
                    return {
                        name: `S${season.toString().padStart(2, "0")}E${episode.toString().padStart(2, "0")}`,
                        season,
                        episode,
                        image: "",
                        path: e.path,
                        overview: "",
                        size: e.size
                    }
                }

                return {
                    name: tvdbEpisode.name,
                    season,
                    episode,
                    image: tvdbEpisode.image,
                    path: e.path,
                    overview: tvdbEpisode.overview || tvdbEpisode.name,
                    size: e.size
                };
            });

            result.push({
                title,
                slug,
                overview,
                poster,
                backdrop,
                type: "series",
                episodes
            });
        } else if (data.year) {
            const tvdbMovie = (await tvdb.getMovie(tvdbData[0].id.split('-')[1]));
            const title = tvdbMovie.name;
            const slug = tvdbMovie.slug;
            const overview = tvdbData[0].overview;
            const poster = tvdbMovie.artworks.find((a) => a.type === 14);
            const backdrop = tvdbMovie.artworks.find((a) => a.type === 15);

            result.push({
                title,
                slug,
                overview,
                path: data.path,
                poster,
                backdrop,
                type: "movie",
                size: data.size
            });
        }
    }

    const adminUser = await prisma.user.findFirst({
        where: {
            roles: {
                some: {
                    name: "admin"
                }
            }
        }
    });

    if (!adminUser) {
        log.error("No admin user found");
        return;
    }

    for (const r of result) {
        let prismaPost = await prisma.post.findFirst({
            where: {
                slug: r.slug
            },
            include: {
                media: true,
                artworks: true
            }
        });

        if (!prismaPost) {
            prismaPost = await prisma.post.create({
                data: {
                    title: r.title,
                    slug: r.slug,
                    content: r.overview || r.title,
                    type: PostType.MEDIA,
                    subType: r.type === "movie" ? PostSubType.MOVIE : PostSubType.SERIES,
                    author: {
                        connect: {
                            uid: adminUser.uid
                        }
                    }
                },
                include: {
                    media: true,
                    artworks: true
                }
            });

            log.info(`New ${r.type}: ${r.title}`);
        } else {
            log.info(`Existing ${r.type}: ${r.title}`);
            prismaPost = await prisma.post.update({
                where: {
                    uid: prismaPost.uid
                },
                data: {
                    title: r.title,
                    content: r.overview || r.title,
                    type: PostType.MEDIA,
                    subType: r.type === "movie" ? PostSubType.MOVIE : PostSubType.SERIES,
                },
                include: {
                    media: true,
                    artworks: true
                }
            });
        }

        // Import Artworks
        if (prismaPost.artworks.length < 2) {
            await prisma.artwork.deleteMany({
                where: {
                    postId: prismaPost.uid
                }
            });

            if (r.poster) {
                await prisma.artwork.create({
                    data: {
                        dataUrl: await fetchImageDataUrl(r.poster.image),
                        width: r.poster?.width,
                        height: r.poster?.height,
                        postId: prismaPost.uid,
                        type: "POSTER"
                    }
                });
                log.info(`\tAdded poster: ${r.poster.image} (${r.poster.width}x${r.poster.height})`);
            }

            if (r.backdrop) {
                await prisma.artwork.create({
                    data: {
                        dataUrl: await fetchImageDataUrl(r.backdrop.image),
                        width: r.backdrop.width,
                        height: r.backdrop.height,
                        postId: prismaPost.uid,
                        type: "BACKGROUND"
                    }
                });
                log.info(`\tAdded backdrop: ${r.backdrop.image} (${r.backdrop.width}x${r.backdrop.height})`);
            }
        }

        // Import Movie Media
        if (r.type === "movie") {
            if (!prismaPost.media) {
                await prisma.media.create({
                    data: {
                        type: MediaType.VIDEO_HARDLINKED,
                        url: r.path,
                        originalUrl: r.path,
                        postId: prismaPost.uid,
                        size: r.size
                    }
                });
                log.info(`\tAdded media: ${r.path}`);
            } else {
                await prisma.media.update({
                    where: {
                        uid: prismaPost.media.uid
                    },
                    data: {
                        url: r.path,
                        originalUrl: r.path,
                        size: r.size
                    }
                });
                log.info(`\tUpdated media: ${r.path}`);
            }
        } else {
            // Import Series Episodes
            for (const e of r.episodes) {
                const episodeStr = `${e.episode.toString().padStart(2, "0")}`;
                const seasonStr = `${e.season.toString().padStart(2, "0")}`;
                let prismaEpisode = await prisma.post.findFirst({
                    where: {
                        slug: `${r.slug}-s${seasonStr}e${episodeStr}`
                    },
                    include: {
                        media: true,
                        artworks: true
                    }
                });

                if (!prismaEpisode) {
                    prismaEpisode = await prisma.post.create({
                        data: {
                            title: e.name,
                            slug: `${r.slug}-s${seasonStr}e${episodeStr}`,
                            content: e.overview || e.name,
                            type: PostType.MEDIA,
                            subType: PostSubType.EPISODE,
                            author: {
                                connect: {
                                    uid: adminUser.uid
                                }
                            },
                            parent: {
                                connect: {
                                    uid: prismaPost.uid
                                }
                            }
                        },
                        include: {
                            media: true,
                            artworks: true
                        }
                    });
                    log.info(`\tNew episode: ${e.name} (S${seasonStr}E${episodeStr})`);
                } else {
                    prismaEpisode = await prisma.post.update({
                        where: {
                            uid: prismaEpisode.uid
                        },
                        data: {
                            title: e.name,
                            content: e.overview || e.name,
                            parent: {
                                connect: {
                                    uid: prismaPost.uid
                                }
                            }
                        },
                        include: {
                            media: true,
                            artworks: true
                        }
                    });
                    log.info(`\tExisting episode: ${e.name} (S${seasonStr}E${episodeStr})`);
                }

                if (!prismaEpisode.media) {
                    await prisma.media.create({
                        data: {
                            type: MediaType.VIDEO_HARDLINKED,
                            url: e.path,
                            originalUrl: e.path,
                            postId: prismaEpisode.uid,
                            size: e.size
                        }
                    });
                    log.info(`\t\tAdded media: ${e.path}`);
                } else {
                    await prisma.media.update({
                        where: {
                            uid: prismaEpisode.media.uid
                        },
                        data: {
                            url: e.path,
                            originalUrl: e.path,
                            size: e.size
                        }
                    });
                    log.info(`\t\tUpdated media: ${e.path}`);
                }

                if (!prismaEpisode.artworks.length && e.image?.length > 0) {
                    await prisma.artwork.create({
                        data: {
                            dataUrl: await fetchImageDataUrl(e.image),
                            width: 1280,
                            height: 720,
                            postId: prismaEpisode.uid,
                            type: "THUMBNAIL"
                        }
                    });
                    log.info(`\t\tAdded backdrop: ${e.image}`);
                }
            }
        }
    }
}
