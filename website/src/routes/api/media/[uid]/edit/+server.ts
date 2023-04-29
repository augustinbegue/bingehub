import { prisma } from '$lib/server/database/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const { uid } = params;
	const { title, content, type, subType, mediaType, mediaUrl } = await request.json();

	if (!uid) {
		return { status: 400, body: { message: 'Missing uid to update.' } };
	}

	const res = await prisma.post.update({
		where: { uid },
		data: {
			title,
			content,
			type,
			subType,
			media: {
				update: {
					type: mediaType,
					url: mediaUrl
				}
			}
		}
	});

	return json({
		success: true,
		updated: res
	});
};
