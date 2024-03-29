import { FloodEndpoint, floodCookie } from '.';
import { getClientSettings } from './getClientSettings';
import { join } from 'path';

export async function addTorrentByURL(urls: string[]) {
	const settings = await getClientSettings();

	const response = await fetch(`${FloodEndpoint}/torrents/add-urls`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: floodCookie!
		},
		body: JSON.stringify({
			urls,
			tags: ['bingehub-managed'],
			destination: join(settings.directoryDefault, 'bingehub-managed'),
			start: true
		}),
		credentials: 'include'
	});

	if (!response.ok) throw new Error(`Failed to add torrent: ${response.statusText}`);

	return await response.json();
}
