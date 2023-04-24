import { prisma } from '$lib/server/database/prisma';
import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (locals.user) {
		await prisma.session.deleteMany({
			where: {
				userId: locals.user.uid
			}
		});

		locals.user = undefined;
	}

	return json({
		success: true
	});
};
