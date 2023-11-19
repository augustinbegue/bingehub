import { isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import { comparePassword, hashPassword } from '$lib/server/auth';

export const PATCH: RequestHandler = async ({ locals, request }) => {
	if (!isLogged(locals.user) || !locals.user) {
		throw error(403, 'Forbidden');
	}

	const { oldPassword, newPassword } = await request.json();

	if (!oldPassword || !newPassword) {
		throw error(400, 'Missing old or new password');
	}

	const user = await prisma.user.findUnique({
		where: {
			uid: locals.user.uid
		}
	});

	if (!user) {
		throw error(400, 'Invalid user');
	}

	// Check if the password matches
	const passwordMatch = await comparePassword(oldPassword, user.password);

	if (!passwordMatch) {
		throw error(401, 'Invalid password');
	}

	// Update the password
	await prisma.user.update({
		where: {
			uid: locals.user.uid
		},
		data: {
			password: await hashPassword(newPassword)
		}
	});

	return json({
		success: true
	});
};
