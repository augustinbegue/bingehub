import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/database/prisma';
import { createReadStream } from 'node:fs';

export const GET: RequestHandler = async ({ request, params }) => {
	const { uid } = params;
	const media = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: true
		}
	});

	if (!media) {
		throw error(404, 'Media not found');
	}

	const manifestPath = media.media?.url.replace('manifest.mpd', 'master.m3u8');

	if (!manifestPath || !manifestPath.endsWith('.m3u8')) {
		throw error(404, 'Media not found');
	}

	// Create a read stream from the DASH manifest file
	const readStream = createReadStream(manifestPath) as unknown as BodyInit;

	return new Response(readStream, {
		headers: {
			'Content-Type': 'application/vnd.apple.mpegurl'
		}
	});
};
