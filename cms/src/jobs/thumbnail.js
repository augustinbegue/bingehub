/* eslint-disable @typescript-eslint/no-var-requires */
const { parentPort, workerData } = require('node:worker_threads');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const { path } = require('@ffmpeg-installer/ffmpeg');
const { readFile, rm } = require('fs/promises');
ffmpeg.setFfmpegPath(path);

/*
 * This job is responsible for generating a thumbnail for a video.
 */
(async () => {
	const { job } = workerData;

	parentPort.postMessage(JSON.stringify({
		status: 'STARTED',
		job
	}));

	let mediaPath = job.data.media.originalUrl.replace(/\\/g, '/');
	const filename = mediaPath.split('/').pop();
	if (!filename) throw new Error('No filename found');

	// replace /torrent with Z:/torrent if on windows
	if (process.platform === 'win32') {
		mediaPath = mediaPath.replace('/torrent', 'Z:/torrent');
	}

	const probe = await ffprobe(mediaPath, { path: ffprobeStatic.path });
	const videoStream = probe.streams.find((stream) => stream.codec_type === 'video');
	const nbFrames = videoStream.nb_frames ?? videoStream['NUMBER_OF_FRAMES'] ?? 0;

	const options = [
		'-frames:v 1'
	];

	// check for HDR
	// if (videoStream.pix_fmt === 'yuv420p10le') {
	// 	options.push(`-vf thumbnail,zscale=transfer=linear,tonemap=tonemap=clip:param=1.0:desat=2:peak=0,zscale=transfer=bt709,format=yuv420p`);
	// } else {
	options.push(`-vf thumbnail`);
	// }

	ffmpeg(mediaPath)
		.outputOptions(options)
		.output(`./${filename}.jpg`)
		.on('error', (err) => {
			parentPort.postMessage({
				status: 'FAILED',
				error: err
			});
		})
		.on('end', async () => {
			const file = await readFile(`./${filename}.jpg`);
			await rm(`./${filename}.jpg`);

			job.data.media.thumbnailDataUrl = `data:image/png;base64,${file.toString('base64')}`;

			parentPort.postMessage({
				status: 'COMPLETED',
				job
			});
		})
		.on('progress', (progress) => {
			if (progress.frames && nbFrames) {
				parentPort?.postMessage({
					status: 'PROGRESS',
					progress: Math.ceil(progress.frames / videoStream.nb_frames * 100)
				});
			}
		})
		.run();
})();
