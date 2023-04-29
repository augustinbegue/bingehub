import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const ssr = false;

export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { uid } = params;
	const { user } = await parent();

	if (!isLogged(user)) {
		throw redirect(301, `/login?redirect=${url.pathname}`);
	}

	const media = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: true
		}
	});

	if (!media || !media.media) {
		throw redirect(301, '/');
	}

	return {
		media
	};
};
