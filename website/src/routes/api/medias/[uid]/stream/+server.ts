import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/database/prisma';
import { createReadStream } from 'node:fs';
import { dev } from '$app/environment';

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

	let manifestPath = media.media?.url;

	console.log(manifestPath);

	if (!manifestPath || !manifestPath.endsWith('.mpd')) {
		throw error(404, 'Media not found');
	}

	if (dev) {
		manifestPath = manifestPath.replace('/torrent', 'Z:\\torrent');
	}

	// Create a read stream from the DASH manifest file
	const readStream = createReadStream(manifestPath);

	return new Response(readStream, {
		headers: {
			'Content-Type': 'application/dash+xml'
		}
	});
};
