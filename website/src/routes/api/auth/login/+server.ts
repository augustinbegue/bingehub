import { prisma } from '$lib/server/database/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { comparePassword } from '$lib/server/auth';
import { createEvent } from '$lib/server/database/utils';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const { username, password } = await request.json();

	const user = await prisma.user.findUnique({
		where: { username },
		include: {
			roles: true
		}
	});

	if (!user) {
		throw error(401, 'Invalid username or password');
	}

	if (user.isDeleted) {
		throw error(401, 'Invalid username or password');
	}

	if (!user.isActive) {
		throw error(403, 'Your account is not active');
	}

	// Check if the password matches
	const passwordMatch = await comparePassword(password, user.password);

	if (!passwordMatch) {
		throw error(401, 'Invalid username or password');
	}

	// Delete previous sessions
	await prisma.session.deleteMany({
		where: {
			userId: user.uid
		}
	});

	// Create a session
	const session = await prisma.session.create({
		data: {
			userId: user.uid
		}
	});

	locals.user = {
		isActive: user.isActive,
		roles: user.roles,
		uid: user.uid,
		username: user.username,
		isDeleted: user.isDeleted
	};

	createEvent('USER_LOGIN', user, {
		from:
			request.headers.get('x-forwarded-for') ||
			request.headers.get('x-real-ip') ||
			getClientAddress()
	});

	return json(
		{
			user: locals.user
		},
		{
			headers: {
				'Set-Cookie': `session=${session.uid}; HttpOnly; Path=/; SameSite=Lax;`
			}
		}
	);
};
