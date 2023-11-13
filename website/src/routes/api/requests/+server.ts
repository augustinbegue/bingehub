import { isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';
import type { User, Request } from '@prisma/client';

export interface GetRequestResponse {
	requests: (Request & {
		author: User;
	})[];
	pagination: IPagination;
}

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const pageLength = parseInt(url.searchParams.get('count') ?? '20');
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const requests = await prisma.request.findMany({
		where: {
			isActive: true,
			isDeleted: false
		},
		include: {
			author: true
		},
		take: pageLength,
		skip: (pagination.current - 1) * pageLength,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});

	pagination.total = Math.ceil(requests.length / pageLength);

	return json({
		requests,
		pagination
	});
};
