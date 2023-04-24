import express from 'express';
import { handler } from './build/handler.js';
import { prisma } from './src/lib/server/database/prisma.js';
import parseRange from 'range-parser';
import fs from 'fs';

import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import { path } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(path);

const app = express();

app.get('/api/media/:uid/stream', async (req, res) => {
	const rangeHeader = req.headers.range;
	const uid = req.params.uid;

	const media = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: true
		}
	});

	const videoPath = `${media?.media?.url}`;

	try {
		const stats = await fs.promises.stat(videoPath);
		const probe = await ffprobe(videoPath, { path: ffprobeStatic.path });
		const videoStream = probe.streams.find((stream) => stream.codec_type === 'video');

		if (!rangeHeader) {
			// No range header, just return the whole file
			const readStream = fs.createReadStream(videoPath);
			res.writeHead(200, {
				'Content-Type': 'video/mp4',
				'Content-Length': stats.size
			});
			readStream.pipe(res);

			return;
		}

		const videoSize = stats.size;

		const ranges = parseRange(videoSize, rangeHeader, {
			combine: true
		});

		console.log('ranges', ranges, rangeHeader);

		if (ranges === -1 || ranges === -2) {
			res.status(400).send('Invalid range');
			return;
		}

		const range = ranges[0];

		const CHUNK_SIZE = 10 ** 6; // 10MB
		const byteStart = Number(range.start);
		const byteEnd = Math.min(byteStart + CHUNK_SIZE, videoSize - 1);

		const contentLength = byteEnd - byteStart + 1;
		res.writeHead(206, {
			'Content-Range': `bytes ${byteStart}-${byteEnd}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': contentLength,
			'Content-Type': 'video/mp4'
		});

		if (['h264'].includes(videoStream?.codec_name ?? '')) {
			console.log('streaming', videoStream?.codec_name);

			const stream = fs.createReadStream(videoPath, { start: byteStart, end: byteEnd });
			stream.pipe(res);
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

			responseStream.pipe(res);
		}
	} catch (err) {
		console.log('err', err);
		res.status(404).send('Not found');
	}
});

app.use(handler);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
