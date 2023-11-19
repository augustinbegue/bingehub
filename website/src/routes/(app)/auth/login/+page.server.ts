import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	if (isLogged(locals.user)) {
		throw redirect(301, url.searchParams.get('redirect') || '/');
	}
};
