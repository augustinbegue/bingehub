import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { prisma } from '$lib/server/database/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	if (!isLogged(locals.user) || !hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const { uid } = params;

	await prisma.post.update({
		where: { uid },
		data: {
			isDeleted: true,
			isActive: false,
			media: {
				update: {
					isDeleted: true,
					isActive: false
				}
			}
		}
	});

	return json({
		success: true
	});
};
