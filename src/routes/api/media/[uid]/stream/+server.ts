import type { RequestHandler } from './$types';
import * as fs from 'fs';
import { error } from '@sveltejs/kit';
import parseRange from 'range-parser';
import { prisma } from '$lib/server/database/prisma';
import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(path);

export const GET: RequestHandler = async ({ request, params }) => {
	const rangeHeader = request.headers.get('range');

	const { uid } = params;
	const media = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: true
		}
	});

	// const videoPath = dev ? `Z:\\r2d2\\static\\clips\\${id}` : `static/clips/${id}`;
	const videoPath = `${media?.media?.url}`;

	console.log('videoPath', videoPath);

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

		const ranges = parseRange(videoSize, rangeHeader, true);

		if (ranges === -1 || ranges === -2) {
			throw error(400, 'Invalid range');
		}

		const range = ranges[0];

		const CHUNK_SIZE = 100 ** 6; // 1MB
		const start = Number(range.start);
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
		// const end = range.end;

		const stream = fs.createReadStream(videoPath, { start, end });

		// Encode video to HLS
		const responseStream = ffmpeg(stream)
			.withNativeFramerate()
			.videoCodec('libx264')
			.audioCodec('aac')
			.format('flv')
			.on('error', (err) => {
				console.log('An error occurred: ' + err.message);
			})
			.on('end', () => {
				console.log('Processing finished !');
			})
			.on('progress', (progress) => {
				console.log('Processing: ' + progress.currentFps + ' fps');
			})
			.pipe();

		const contentLength = end - start + 1;
		const res = new Response(responseStream, {
			status: 206,
			headers: {
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength.toString(),
				'Content-Range': `bytes ${start}-${end}/${videoSize}`,
				'Content-Type': 'video/mp4'
			}
		});

		return res;
	} catch (err) {
		console.log('err', err);

		throw error(404, 'Video not found');
	}
};
