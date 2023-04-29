import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const POST: RequestHandler = async ({ locals, request }) => {
	const { name } = await request.json();

	// TODO: PERMISSIONS

	if (!name) {
		throw error(400, 'Missing name');
	}

	// Create a role
	const role = await prisma.role.create({
		data: {
			name
		}
	});

	return json({
		success: true
	});
};
