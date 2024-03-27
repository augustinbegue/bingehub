import { isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';
import type { IPagination } from '$lib/types';
import type { Post, Media } from '@prisma/client';

export interface GetMediaResponse {
	medias: (Post & {
		media: Media | null;
	})[];
	pagination: IPagination;
}

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const pageLength = parseInt(url.searchParams.get('count') ?? '-1');
	const pagination: IPagination = {
		current: parseInt(url.searchParams.get('page') ?? '1'),
		total: 0
	};

	const medias = await prisma.post.findMany({
		where: {
			isActive: true,
			isDeleted: false,
			type: 'MEDIA',
			subType: {
				in: ['MOVIE', 'SERIES']
			}
		},
		take: pageLength == -1 ? undefined : pageLength,
		skip: pageLength == -1 ? undefined : (pagination.current - 1) * pageLength,
		orderBy: [
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
