import { hasRole } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import type { Request, RequestStatus, RequestType } from '@prisma/client';

export interface RequestEditBody {
	title?: string;
	status?: RequestStatus;
	type?: RequestType;
	content?: string;
	postId?: string;
}

export interface RequestEditResponse {
	success: boolean;
	updated:
		| (Request & {
				author: {
					username: string;
					uid: string;
				};
		  })
		| null;
}

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const { uid } = params;

	if (!hasRole('admin', locals.user)) {
		throw error(403, 'Forbidden');
	}

	if (!uid) {
		throw error(400, 'Missing uid');
	}

	const { title, status, type, content, postId } = (await request.json()) as RequestEditBody;

	if (!title && !status && !type && !content && !postId) {
		throw error(400, 'Missing fields');
	}

	const res = await prisma.request.update({
		where: { uid },
		data: {
			title,
			status,
			type,
			content,
			postId
		},
		include: {
			author: {
				select: {
					username: true,
					uid: true
				}
			}
		}
	});

	return json({
		success: true,
		updated: res
	});
};
