import { hashPassword } from '$lib/server/auth';
import { prisma } from '$lib/server/database/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { hasRole } from '$lib/modules/auth/utils';

export const POST: RequestHandler = async ({ locals, request }) => {
	const { username, password } = await request.json();

	if (!hasRole('admin', locals.user)) {
		throw error(403, 'Forbidden');
	}

	if (!username || !password) {
		throw error(400, 'Missing username or password');
	}

	// Create a user
	const user = await prisma.user.create({
		data: {
			username,
			password: await hashPassword(password)
		},
		select: {
			createdAt: true,
			updatedAt: true,
			uid: true,
			username: true
		}
	});

	return json({
		success: true,
		user
	});
};
