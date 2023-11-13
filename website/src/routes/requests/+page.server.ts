import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GetRequestResponse } from '../api/request/+server';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	if (!isLogged(locals.user)) {
		throw redirect(301, '/auth/login');
	}

	const page = parseInt(url.searchParams.get('page') ?? '1');

	const requests = (await fetch(`/api/request?page=${page}`).then(
		async (res) => await res.json()
	)) as GetRequestResponse;

	return requests;
};
