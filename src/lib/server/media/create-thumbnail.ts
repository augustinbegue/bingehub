import ffmpeg from 'fluent-ffmpeg';
import { path } from '@ffmpeg-installer/ffmpeg';
import { readFile, rm } from 'fs/promises';
ffmpeg.setFfmpegPath(path);

/**
 * returns a data url to the thumbnail of a video
 * @param path path of the video
 */
export async function createThumbnail(path: string) {
	path = path.replace(/\\/g, '/');

	const filename = path.split('/').pop();
	if (!filename) throw new Error('No filename found');

	console.log(path, filename);

	return new Promise<string>((resolve, reject) => {
		ffmpeg(path)
			.outputOptions('-vf', 'thumbnail', '-frames:v', '1')
			.output(`./${filename}.jpg`)
			.on('error', (err) => {
				console.log('An error occurred: ' + err.message);
				reject(err);
			})
			.on('end', async () => {
				const file = await readFile(`./${filename}.jpg`);
				await rm(`./${filename}.jpg`);

				resolve(`data:image/png;base64,${file.toString('base64')}`);
			})
			.run();
	});
}
