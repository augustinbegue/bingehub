import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import { hasRole } from '$lib/modules/auth/utils';
import { createEvent } from '$lib/server/database/utils';

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

	const user = await prisma.user.findUnique({
		where: {
			uid: userBody.uid
		}
	});

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

	if (user?.isActive !== updatedUser.isActive) {
		if (updatedUser.isActive)
			createEvent('USER_ENABLE', updatedUser, {
				author: locals.user?.uid
			});
		else
			createEvent('USER_DISABLE', updatedUser, {
				author: locals.user?.uid
			});
	}

	if (userBody.roles.length > 0) {
		createEvent('USER_ROLE_CHANGE', updatedUser, {
			roleUids: userBody.roles.map((role) => role.uid)
		});
	}

	return json({
		success: true,
		user: updatedUser
	});
};
