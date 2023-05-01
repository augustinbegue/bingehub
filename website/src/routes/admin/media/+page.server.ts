import { hasRole } from '$lib/modules/auth/utils';
import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const posts = await prisma.post.findMany({
		where: {
			isDeleted: false,
			type: 'MEDIA'
		},
		orderBy: {
			createdAt: 'desc'
		},
		skip: (pagination.current - 1) * 20,
		take: 20,
		include: {
			author: {
				select: {
					username: true
				}
			},
			media: {
				select: {
					uid: true,
					type: true,
					url: true,
					thumbnailDataUrl: true
				}
			}
		}
	});

	pagination.total = Math.ceil(
		(await prisma.post.count({
			where: {
				isDeleted: false
			}
		})) / 20
	);

	return {
		posts,
		pagination
	};
};
