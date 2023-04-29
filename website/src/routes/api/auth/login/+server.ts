import { prisma } from '$lib/server/database/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { comparePassword } from '$lib/server/auth';

export const POST: RequestHandler = async ({ locals, request }) => {
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
