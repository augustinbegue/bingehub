import type { FloodTorrent } from '.';
import { FloodEndpoint, floodCookie } from '.';

export async function listTorrents() {
	const response = await fetch(`${FloodEndpoint}/torrents`, {
		credentials: 'include',
		headers: {
			cookie: floodCookie!
		}
	});

	if (!response.ok) throw new Error(`Failed to list torrents: ${response.statusText}`);

	const res = (await response.json()) as {
		id: number;
		torrents: [string: FloodTorrent];
	};

	return res.torrents;
}
