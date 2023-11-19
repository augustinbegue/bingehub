import { hasRole } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Subscription } from '@prisma/client';
import { prisma } from '$lib/server/database/prisma';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!hasRole('admin', locals.user)) {
		throw error(403, 'Unauthorized');
	}

	const subscription = (await request.json()) as Subscription;

	if (!subscription || !subscription.expiresAt || !subscription.userId) {
		throw error(400, 'Invalid body');
	}

	const res = await prisma.subscription.create({
		data: {
			expiresAt: subscription.expiresAt,
			userId: subscription.userId,
			isActive: true
		}
	});

	return json(res);
};
