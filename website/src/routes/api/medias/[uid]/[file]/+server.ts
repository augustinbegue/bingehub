import type { RequestHandler } from './$types';
import * as fs from 'fs';
import { error } from '@sveltejs/kit';
import parseRange from 'range-parser';
import { prisma } from '$lib/server/database/prisma';

export const GET: RequestHandler = async ({ request, params }) => {
	const rangeHeader = request.headers.get('content-range') || request.headers.get('range') || null;
	const file = params.file;

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

	const manifestPath = media.media?.url;
	if (!manifestPath) {
		throw error(404, 'Media not found');
	}

	const videoPath = manifestPath.replace('manifest.mpd', file);

	try {
		const stats = await fs.promises.stat(videoPath);

		if (!rangeHeader) {
			// No range header, just return the whole file
			const readStream = fs.createReadStream(videoPath);
			const res = new Response(readStream, {
				status: 200,
				headers: {
					'Content-Type': 'video/mp4'
				}
			});

			return res;
		}

		const videoSize = stats.size;
		const ranges = parseRange(videoSize, rangeHeader, {
			combine: true
		});
		if (ranges === -1 || ranges === -2) {
			throw error(400, 'Invalid range');
		}

		const range = ranges[0];

		const CHUNK_SIZE = 10 ** 6; // 1MB
		const byteStart = Number(range.start);
		const byteEnd = Math.min(byteStart + CHUNK_SIZE, videoSize - 1);
		// const end = range.end;

		const contentLength = byteEnd - byteStart + 1;

		const stream = fs.createReadStream(videoPath, { start: byteStart, end: byteEnd });

		return new Response(stream, {
			status: 206,
			headers: {
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength.toString(),
				'Content-Range': `bytes ${byteStart}-${byteEnd}/${videoSize}`,
				'Content-Type': 'video/mp4'
			}
		});
	} catch (err) {
		console.log('err', err);

		throw error(404, 'Video not found');
	}
};
