// @ts-nocheck
import { isLogged } from '$lib/modules/auth/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	if (!isLogged(locals.user)) {
		throw redirect(301, '/auth/login?redirect=/');
	}

	return;
};
