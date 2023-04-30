import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!isLogged(locals.user) || !hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const { type, data, mediaUid } = await request.json();

	if (!type || !data || !mediaUid) {
		throw error(400, 'Missing required fields');
	}

	const job = await prisma.job.create({
		data: {
			type,
			data,
			media: {
				connect: {
					uid: mediaUid
				}
			},
			user: {
				connect: {
					uid: locals.user!.uid
				}
			},
			progress: 0
		}
	});

	return json({ job });
};
