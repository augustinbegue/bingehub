import { hasRole } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const POST: RequestHandler = async ({ locals, request, params }) => {
	if (!hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const uid = params.uid;

	if (!uid) {
		throw error(400, 'Missing required fields');
	}

	const updated = await prisma.job.update({
		where: {
			uid
		},
		data: {
			status: 'QUEUED',
			progress: 0
		}
	});

	return json(updated);
};
