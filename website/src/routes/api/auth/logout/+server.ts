import { prisma } from '$lib/server/database/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createEvent } from '$lib/server/database/utils';
import type { User } from '@prisma/client';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	if (locals.user) {
		await prisma.session.deleteMany({
			where: {
				userId: locals.user.uid
			}
		});

		createEvent('USER_LOGOUT', locals.user as unknown as User, {
			from:
				request.headers.get('x-forwarded-for') ||
				request.headers.get('x-real-ip') ||
				getClientAddress()
		});

		locals.user = undefined;
	}

	return json({
		success: true
	});
};
