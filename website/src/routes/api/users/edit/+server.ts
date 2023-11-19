import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import { hasRole } from '$lib/modules/auth/utils';

export const PATCH: RequestHandler = async ({ locals, request }) => {
	if (!hasRole('admin', locals.user)) {
		throw error(403, 'Forbidden');
	}

	const userBody = (await request.json()) as {
		uid: string;
		username: string;
		isActive: boolean;
		roles: {
			uid: string;
		}[];
	};

	if (!userBody.uid) {
		throw error(400, 'Missing user UID');
	}

	const updatedUser = await prisma.user.update({
		where: {
			uid: userBody.uid
		},
		data: {
			username: userBody.username,
			isActive: userBody.isActive,
			roles: {
				connect: userBody.roles
			}
		}
	});

	return json({
		success: true,
		user: updatedUser
	});
};
