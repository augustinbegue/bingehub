import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { title, content, type, subType, mediaType, mediaUrl } = await request.json();

	if (!isLogged(locals.user) || !hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	if (!title || !content || !type || !subType || !mediaType || !mediaUrl) {
		throw error(400, 'Missing required fields');
	}

	const { uid } = await prisma.post.create({
		data: {
			title,
			content,
			type,
			subType,
			authorId: locals.user!.uid,
			isActive: false,
			media: {
				create: {
					type: mediaType,
					url: mediaUrl,
					originalUrl: mediaUrl
				}
			}
		}
	});

	return json({
		success: true,
		uid
	});
};
