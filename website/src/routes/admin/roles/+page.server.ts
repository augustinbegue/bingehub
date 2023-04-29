import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const roles = await prisma.role.findMany({
		select: {
			uid: true,
			name: true,
			createdAt: true,
			updatedAt: true,
			isActive: true,
			_count: {
				select: {
					users: true
				}
			}
		},
		where: {
			isDeleted: false
		},
		orderBy: {
			createdAt: 'desc'
		},
		skip: (pagination.current - 1) * 20,
		take: 20
	});

	pagination.total = await prisma.role.count({
		where: {
			isDeleted: false
		}
	});

	return {
		roles,
		pagination
	};
};
