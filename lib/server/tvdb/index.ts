const TVDB_URL = 'https://api4.thetvdb.com/v4';

export interface TVDBSearchResult {
    status: 'success' | 'error';
    data: {
        objectID: string;
        id: string;
        tvdb_id: string;
        name: string;
        first_air_time: string;
        overview: string;
        image_url: string;
        thumbnail_url: string;
        slug: string;
        type: string;
    }[];
}

export interface TVDBLoginResult {
    status: 'success' | 'error';
    data: {
        token: string;
    };
}

export interface TVDBArtwork {
    id: number;
    image: string;
    thumbnail: string;
    type: number;
    score: number;
    width: number;
    height: number;
    includesText: boolean;
}

export interface TVDBSeries {
    id: number;
    name: string;
    slug: string;
    image: string;
    firstAired: string;
    overview: string;
    artworks: TVDBArtwork[];
}

export interface TVDBEpisode {
    id: number;
    seriesId: string;
    name: string;
    overview: string;
    number: number;
    seasonNumber: number;
    image: string;
}

export interface TVDBMovie {
    id: string;
    name: string;
    slug: string;
    image: string;
    firstAired: string;
    overview: string;
    artworks: TVDBArtwork[];
}

export class TVDB {
    static instance: TVDB;
    static API_KEY = process.env.TVDB_API_KEY;

    token: string;

    private constructor(token: string) {
        this.token = token;
    }

    private static async login(): Promise<string> {
        if (!TVDB.API_KEY) {
            throw new Error('TVDB_API_KEY not set');
        }

        console.log('Logging into TVDB with API key', TVDB.API_KEY);

        const res = await fetch(`${TVDB_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apikey: TVDB.API_KEY
            })
        });
        const data = await res.json() as TVDBLoginResult;

        console.log('Login result', res.status, data);

        return data.data.token;
    }

    static async getInstance(): Promise<TVDB> {
        if (!TVDB.instance) {
            const token = await TVDB.login();
            TVDB.instance = new TVDB(token);
        }

        return TVDB.instance;
    }

    private getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'x-api-key': TVDB.API_KEY as string
        };
    }

    async search(query: string,
        options: {
            limit?: number;
            offset?: number;
            type?: 'series' | 'movie' | 'person' | 'company';
        } = {}): Promise<TVDBSearchResult> {
        const url = new URL(`${TVDB_URL}/search`);
        url.searchParams.append('query', query);

        for (const [key, value] of Object.entries(options)) {
            url.searchParams.append(key, value as string);
        }

        const res = await fetch(url, {
            headers: {
                ...this.getHeaders()
            }
        });

        const data = await res.json();
        return data;
    }

    async getSeries(id: number): Promise<TVDBSeries | null> {
        const res = await fetch(`${TVDB_URL}/series/${id}/extended`, {
            headers: {
                ...this.getHeaders()
            }
        });

        const resData = await res.json();

        if (resData.status === 'failure') {
            return null;
        }

        return resData.data;
    }

    async getSeriesEpisodes(seriesId: number, order = "official"): Promise<{
        series: TVDBSeries;
        episodes: TVDBEpisode[];
    } | null> {
        const res = await fetch(`${TVDB_URL}/series/${seriesId}/episodes/${order}`, {
            headers: {
                ...this.getHeaders()
            }
        });

        const resData = await res.json();

        if (resData.status === 'failure') {
            return null;
        }

        return resData.data;
    }

    async getMovie(id: string): Promise<TVDBMovie | null> {
        const res = await fetch(`${TVDB_URL}/movies/${id}/extended`, {
            headers: {
                ...this.getHeaders()
            }
        });

        const resData = await res.json();

        if (resData.status === 'failure') {
            return null;
        }

        return resData.data;
    }
}
