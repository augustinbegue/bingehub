import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { RequestType } from '@prisma/client';
import { prisma } from '$lib/server/database/prisma';
import { isLogged } from '$lib/modules/auth/utils';

export interface CreateRequestBody {
	type: RequestType;
	title: string;
	content: string;
}

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const body = (await request.json()) as CreateRequestBody;

	if (!body.type || !body.title || !body.content) {
		throw error(400, 'Missing required body parameters');
	}

	const res = await prisma.request.create({
		data: {
			type: body.type,
			title: body.title,
			content: body.content,
			author: {
				connect: {
					uid: locals.user?.uid
				}
			},
			status: 'PENDING'
		}
	});

	return json(res);
};
