import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addTorrentByURL } from '$lib/server/flood/addTorrentByURL';
import { addTorrentByFiles } from '$lib/server/flood/addTorrentByFiles';
import { authenticate } from '$lib/server/flood/authenticate';

export interface AddTorrentBody {
	urls: string[];
	files: string[];
}

export type AddTorrentResponse = string[];

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!isLogged(locals.user)) throw error(401, 'Unauthorized');

	if (!hasRole('admin', locals.user)) throw error(403, 'Forbidden');

	const { urls, files } = (await request.json()) as AddTorrentBody;

	if (!urls && !files) throw error(400, 'Missing URL or Files');

	await authenticate(process.env.FLOOD_USERNAME, process.env.FLOOD_PASSWORD);

	let res: string[] = [];
	if (urls?.length > 0) res = await addTorrentByURL(urls);

	let res2: string[] = [];
	if (files?.length > 0) res2 = await addTorrentByFiles(files);

	return json([...res, ...res2]);
};
