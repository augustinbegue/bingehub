import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, url }) => {
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const events = await prisma.event.findMany({
		where: {
			isDeleted: false
		},
		orderBy: {
			updatedAt: 'desc'
		},
		skip: (pagination.current - 1) * 100,
		take: 100,
		include: {
			user: {
				select: {
					username: true
				}
			}
		}
	});

	pagination.total = Math.ceil(
		(await prisma.event.count({
			where: {
				isDeleted: false
			}
		})) / 100
	);

	return {
		events,
		pagination
	};
};
