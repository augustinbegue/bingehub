import type { RequestHandler } from './$types';
import * as fs from 'fs';
import { error } from '@sveltejs/kit';
import parseRange from 'range-parser';
import { prisma } from '$lib/server/database/prisma';

import { path } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
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
		const probe = await ffprobe(videoPath, { path: ffprobeStatic.path });
		const videoStream = probe.streams.find((stream) => stream.codec_type === 'video');

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
		console.log('range', range);

		const CHUNK_SIZE = 100 ** 6; // 1MB
		const byteStart = Number(range.start);
		const byteEnd = Math.min(byteStart + CHUNK_SIZE, videoSize - 1);
		// const end = range.end;

		const contentLength = byteEnd - byteStart + 1;

		if (['h264'].includes(videoStream?.codec_name ?? '')) {
			console.log('streaming', videoStream?.codec_name);

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
		} else {
			console.log('transcoding', videoStream?.codec_name);

			// Encode video
			const responseStream = ffmpeg(videoPath)
				// .setStartTime(byteStart)
				.outputOptions(['-f mp4', '-c:v libx264', '-c:a aac', '-movflags frag_keyframe+empty_moov'])
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

			return new Response(responseStream, {
				status: 206,
				headers: {
					'Accept-Ranges': 'bytes',
					'Content-Length': contentLength.toString(),
					'Content-Range': `bytes ${byteStart}-${byteEnd}/${videoSize}`,
					'Content-Type': 'video/mp4'
				}
			});
		}
	} catch (err) {
		console.log('err', err);

		throw error(404, 'Video not found');
	}
};
