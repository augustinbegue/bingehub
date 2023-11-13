import { FloodTorrent } from '.';
import { FloodEndpoint } from '.';

export async function listTorrents() {
	const response = await fetch(`${FloodEndpoint}/torrents`);

	if (!response.ok) throw new Error(`Failed to list torrents: ${response.statusText}`);

	const res = (await response.json()) as {
		id: number;
		torrents: FloodTorrent[];
	};

	return res.torrents;
}
