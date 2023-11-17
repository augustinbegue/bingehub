import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { listTorrents } from '$lib/server/flood/listTorrents';
import { authenticate } from '$lib/server/flood/authenticate';

export const load: PageServerLoad = async ({ locals }) => {
	if (!isLogged(locals.user)) throw error(401, 'Unauthorized');

	if (!hasRole('admin', locals.user)) throw error(403, 'Forbidden');

	await authenticate(process.env.FLOOD_USERNAME, process.env.FLOOD_PASSWORD);
	const torrents = await listTorrents();

	return {
		torrents
	};
};
