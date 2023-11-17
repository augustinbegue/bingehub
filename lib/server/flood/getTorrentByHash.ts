import { listTorrents } from './listTorrents';
import { authenticate } from './authenticate';

export async function getTorrentByHash(hash: string) {
	await authenticate();
	const torrents = await listTorrents();

	console.log(torrents[hash]);

	return torrents[hash];
}
