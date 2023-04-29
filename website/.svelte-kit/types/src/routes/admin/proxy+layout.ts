// @ts-nocheck
import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = async ({ parent, url }: Parameters<LayoutLoad>[0]) => {
	const parentData = await parent();

	if (!isLogged(parentData.user)) {
		throw redirect(307, '/auth/login?redirect=' + url.pathname);
	}

	if (!hasRole('admin', parentData.user)) {
		throw error(403, 'You are not allowed to access this page');
	}

	if (url.pathname === '/admin') {
		throw redirect(301, '/admin/users');
	}
};
