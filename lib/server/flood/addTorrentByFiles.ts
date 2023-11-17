import { FloodEndpoint, floodCookie } from '.';
import { getClientSettings } from './getClientSettings';
import { join } from 'path';

export async function addTorrentByFiles(files: string[]) {
	const settings = await getClientSettings();

	const destination = settings.directoryDefault + '/bingehub-managed';
	const response = await fetch(`${FloodEndpoint}/torrents/add-files`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			cookie: floodCookie!
		},
		body: JSON.stringify({
			files,
			tags: ['bingehub-managed'],
			destination,
			start: true
		}),
		credentials: 'include'
	});

	if (!response.ok) throw new Error(`Failed to add torrent: ${response.statusText}`);

	return await response.json();
}
