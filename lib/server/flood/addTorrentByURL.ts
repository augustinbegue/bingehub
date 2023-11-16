import { FloodEndpoint, floodCookie } from '.';

export async function addTorrentByURL(url: string) {
	const response = await fetch(`${FloodEndpoint}/torrents/add-urls`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			cookie: floodCookie!
		},
		body: JSON.stringify({ urls: [url], tags: ['bingehub-managed'] })
	});

	if (!response.ok) throw new Error(`Failed to add torrent: ${response.statusText}`);

	return await response.json();
}
