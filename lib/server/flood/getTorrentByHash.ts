import { listTorrents } from './listTorrents';
import { authenticate } from './authenticate';

export async function getTorrentByHash(hash: string) {
	await authenticate(process.env.FLOOD_USERNAME, process.env.FLOOD_PASSWORD);
	const torrents = await listTorrents();

	return torrents[hash];
}
