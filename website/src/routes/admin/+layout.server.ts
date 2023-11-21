import { isLogged, hasRole } from '$lib/modules/auth/utils';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!isLogged(locals.user)) throw error(401, 'Unauthorized');

	if (!hasRole('admin', locals.user)) throw error(403, 'Forbidden');
};
