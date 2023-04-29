import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import { createThumbnail } from '$lib/server/media/create-thumbnail';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { title, content, type, subType, mediaType, mediaUrl } = await request.json();

	if (!isLogged(locals.user) || !hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	if (!title || !content || !type || !subType || !mediaType || !mediaUrl) {
		throw error(400, 'Missing required fields');
	}

	// create thumbnail
	const thumbnail = await createThumbnail(mediaUrl);

	const { uid } = await prisma.post.create({
		data: {
			title,
			content,
			type,
			subType,
			authorId: locals.user!.uid,
			media: {
				create: {
					type: mediaType,
					url: mediaUrl,
					thumbnailDataUrl: thumbnail
				}
			}
		}
	});

	return json({
		success: true,
		uid
	});
};
