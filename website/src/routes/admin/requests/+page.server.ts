import { prisma } from '$lib/server/database/prisma';
import type { FloodTorrent } from '$lib/server/flood';
import { getTorrentByHash } from '$lib/server/flood/getTorrentByHash';
import type { IPagination } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const requests = await prisma.request.findMany({
		where: {
			isDeleted: false
		},
		orderBy: {
			createdAt: 'desc'
		},
		skip: (pagination.current - 1) * 20,
		take: 20,
		include: {
			author: {
				select: {
					username: true,
					uid: true
				}
			}
		}
	});

	pagination.total = Math.ceil(
		(await prisma.request.count({
			where: {
				isDeleted: false
			}
		})) / 20
	);

	const torrents: FloodTorrent[] = [];

	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];

		if (request.torrent) {
			torrents.push(await getTorrentByHash(request.torrent));
		}
	}

	return {
		requests,
		pagination,
		torrents
	};
};
