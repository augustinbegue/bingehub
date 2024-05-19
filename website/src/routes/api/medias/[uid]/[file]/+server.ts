import type { RequestHandler } from './$types';
import * as fs from 'fs';
import { error } from '@sveltejs/kit';
import parseRange from 'range-parser';
import { prisma } from '$lib/server/database/prisma';

export const GET: RequestHandler = async ({ request, params, locals }) => {
	const rangeHeader = request.headers.get('content-range') || request.headers.get('range') || null;
	const file = params.file;

	const { uid } = params;
	const post = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: {
				select: {
					uid: true,
					url: true,
					originalUrl: true,
					views: {
						where: {
							userId: locals.user?.uid
						}
					}
				}
			}
		}
	});

	if (!post || !post.media) {
		throw error(404, 'Media not found');
	}

	if (post.media.views.length === 0 && locals.user?.uid) {
		await prisma.view.create({
			data: {
				percentage: 0,
				userId: locals.user.uid,
				mediaId: post.media.uid
			}
		});
	}

	const DASH = file !== 'static';

	let videoPath = DASH ? post.media?.url?.replace('manifest.mpd', file) : post.media?.originalUrl;

	if (!videoPath) {
		throw error(404, 'Media not found');
	}

	videoPath = videoPath.replace(/\\/g, '/');

	try {
		const stats = await fs.promises.stat(videoPath);

		if (!rangeHeader) {
			// No range header, just return the whole file
			const fileStream = fs.createReadStream(videoPath);

			let contentType = 'video/webm';
			if (file.endsWith('.mpd')) {
				contentType = 'application/dash+xml';
			} else if (file.endsWith('.m3u8')) {
				contentType = 'application/vnd.apple.mpegurl';
			}

			if (locals.user?.uid) {
				await prisma.view.update({
					where: {
						userId_mediaId: {
							userId: locals.user?.uid,
							mediaId: post.media.uid
						}
					},
					data: {
						percentage: 100
					}
				});
			}

			const res = new Response(fileStream, {
				status: 200,
				headers: {
					'Content-Type': contentType,
					'Content-Length': stats.size.toString()
				}
			});

			return res;
		}

		const videoSize = stats.size;
		const ranges = parseRange(videoSize, rangeHeader, {
			combine: true
		});
		if (ranges === -1 || ranges === -2) {
			throw error(400, 'Invalid range');
		}

		const range = ranges[0];
		const byteStart = Number(range.start);
		let byteEnd = Number(range.end);

		if (!DASH) {
			const CHUNK_SIZE = 100 ** 6; // 100MB
			byteEnd = Math.min(byteStart + CHUNK_SIZE, videoSize - 1);
		}

		const contentLength = byteEnd - byteStart + 1;

		if (locals.user?.uid) {
			await prisma.view.update({
				where: {
					userId_mediaId: {
						userId: locals.user?.uid,
						mediaId: post.media.uid
					}
				},
				data: {
					percentage: Math.round((byteStart / videoSize) * 100)
				}
			});
		}

		const stream = fs.createReadStream(videoPath, { start: byteStart, end: byteEnd });

		return new Response(stream, {
			status: 206,
			headers: {
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength.toString(),
				'Content-Range': `bytes ${byteStart}-${byteEnd}/${videoSize}`,
				'Content-Type': 'video/webm'
			}
		});
	} catch (err) {
		console.log('err', err);

		throw error(404, 'Video not found');
	}
};
