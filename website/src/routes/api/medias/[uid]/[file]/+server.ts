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
			media: {
				select: {
					url: true,
					originalUrl: true
				}
			}
		}
	});

	if (!media) {
		throw error(404, 'Media not found');
	}
	const DASH = file !== 'static';

	let videoPath = DASH ? media.media?.url?.replace('manifest.mpd', file) : media.media?.originalUrl;

	if (!videoPath) {
		throw error(404, 'Media not found');
	}

	videoPath = videoPath.replace(/\\/g, '/');

	try {
		const stats = await fs.promises.stat(videoPath);

		if (!rangeHeader) {
			// No range header, just return the whole file
			const readStream = fs.createReadStream(videoPath);

			let contentType = 'video/webm';
			if (file.endsWith('.mpd')) {
				contentType = 'application/dash+xml';
			} else if (file.endsWith('.m3u8')) {
				contentType = 'application/vnd.apple.mpegurl';
			}

			const res = new Response(readStream, {
				status: 200,
				headers: {
					'Content-Type': contentType,
					'Content-Length': stats.size.toString()
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
		const byteStart = Number(range.start);
		let byteEnd = Number(range.end);

		if (!DASH) {
			const CHUNK_SIZE = 100 ** 6; // 100MB
			byteEnd = Math.min(byteStart + CHUNK_SIZE, videoSize - 1);
		}

		const contentLength = byteEnd - byteStart + 1;

		const stream = fs.createReadStream(videoPath, { start: byteStart, end: byteEnd });

		return new Response(stream, {
			status: 206,
			headers: {
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength.toString(),
				'Content-Range': `bytes ${byteStart}-${byteEnd}/${videoSize}`,
				'Content-Type': 'video/webm'
			}
		});
	} catch (err) {
		console.log('err', err);

		throw error(404, 'Video not found');
	}
};
