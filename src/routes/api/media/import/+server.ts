import { hasRole, isLogged } from '$lib/modules/auth/utils';
import { prisma } from '$lib/server/database/prisma';
import { MediaType, type Media } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { paths, mediaType, title } = await request.json();

	if (!isLogged(locals.user) || !hasRole('admin', locals.user)) {
		throw error(401, 'Unauthorized');
	}

	if (!paths || !mediaType || !title) {
		throw error(400, 'Missing required fields');
	}

	if (mediaType === MediaType.VIDEO_HARDLINKED) {
		const basePath = paths[0];

		if (!basePath) {
			throw error(400, 'Missing required fields');
		}

		try {
			const res = await readdir(basePath);

			console.log(res);

			const medias: any[] = res.map((path) => {
				return {
					basePath,
					path,
					title: `${title} - ${path.match(/S\d{2}E\d{2}/)?.[0]}`
				};
			});

			return json({
				success: true,
				medias
			});
		} catch (e) {
			throw error(400, 'Invalid path');
		}
	} else if (mediaType === MediaType.VIDEO_UPLOADED) {
		throw error(501, 'Not implemented');
	}

	throw error(400, 'Invalid media type');
};
