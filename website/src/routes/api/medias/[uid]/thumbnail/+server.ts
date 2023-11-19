import { isLogged } from '$lib/modules/auth/utils';
import { error, json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const { uid } = params;

	if (!uid) throw error(400, 'Bad Request');

	const media = await prisma.post.findUnique({
		where: {
			uid
		},
		select: {
			media: {
				select: {
					thumbnailDataUrl: true
				}
			}
		}
	});

	if (!media || !media.media || !media.media.thumbnailDataUrl)
		throw error(404, 'Thumbnail not found');

	return text(media.media.thumbnailDataUrl, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
