import { isLogged } from '$lib/modules/auth/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const GET: RequestHandler = async ({ locals, url }) => {
	const query = url.searchParams.get('q') ?? '';

	if (!isLogged(locals.user)) {
		throw error(401, 'Unauthorized');
	}

	const response = await prisma.post.findMany({
		where: {
			AND: [
				{ type: 'MEDIA' },
				{
					title: {
						mode: 'insensitive',
						contains: query
					}
				},
				{ isActive: true }
			]
		},
		select: {
			uid: true,
			title: true,
			createdAt: true,
			updatedAt: true,
			artworks: {
				select: {
					uid: true,
					type: true
				}
			},
		},
		orderBy: [
			{
				createdAt: 'desc'
			},
			{
				title: 'asc'
			}
		]
	});

	return json({
		results: response
	});
};
