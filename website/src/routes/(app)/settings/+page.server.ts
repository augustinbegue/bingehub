import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!isLogged(locals.user)) {
		throw redirect(301, '/auth/login');
	}

	return {
		user: locals.user
	};
};
