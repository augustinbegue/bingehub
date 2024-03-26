import { prisma } from '$lib/server/database/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { hasRole } from '$lib/modules/auth/utils';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	const { uid } = params;
	const { title, content, type, subType, mediaType, mediaUrl, isActive } =
		await request.json();

	if (!hasRole('admin', locals.user)) {
		throw error(403, 'Forbidden');
	}

	if (!uid) {
		throw error(400, 'Missing uid');
	}

	const res = await prisma.post.update({
		where: { uid },
		data: {
			title,
			content,
			type,
			subType,
			isActive,
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
