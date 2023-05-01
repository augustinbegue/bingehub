import { isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const pageLength = parseInt(url.searchParams.get('count') ?? '9');
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const medias = await prisma.post.findMany({
		where: {
			isActive: true,
			isDeleted: false,
			type: 'MEDIA'
		},
		include: {
			media: true
		},
		take: pageLength,
		skip: (pagination.current - 1) * pageLength,
		orderBy: [
			{
				title: 'desc'
			},
			{
				createdAt: 'desc'
			}
		]
	});
	const count = await prisma.post.count({
		where: {
			isActive: true,
			isDeleted: false,
			type: 'MEDIA'
		}
	});

	pagination.total = Math.ceil(count / pageLength);

	return json({
		medias,
		pagination
	});
};
