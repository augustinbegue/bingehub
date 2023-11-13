import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GetRequestResponse } from '../api/requests/+server';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	if (!isLogged(locals.user)) {
		throw redirect(301, '/auth/login');
	}

	const page = parseInt(url.searchParams.get('page') ?? '1');

	const requests = (await fetch(`/api/requests?page=${page}`).then(
		async (res) => await res.json()
	)) as GetRequestResponse;

	return requests;
};
