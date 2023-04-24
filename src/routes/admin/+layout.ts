import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';

export const load: LayoutLoad = async ({ parent, url }) => {
	const parentData = await parent();

	if (!isLogged(parentData.user)) {
		throw redirect(307, '/auth/login?redirect=' + url.pathname);
	}

	if (!hasRole('admin', parentData.user)) {
		throw error(403, 'You are not allowed to access this page');
	}
};
