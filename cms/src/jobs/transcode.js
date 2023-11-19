/* eslint-disable @typescript-eslint/no-var-requires */
const { parentPort, workerData } = require('node:worker_threads');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const { path: ffmpegPath } = require('@ffmpeg-installer/ffmpeg');
const { join } = require('node:path');
ffmpeg.setFfmpegPath(ffmpegPath);
const { mkdir, rm, writeFile } = require('node:fs/promises');
const { exec } = require('node:child_process');

/*
 * This job transcodes a video to a hls stream.
 * @see https://en.wikipedia.org/wiki/HTTP_Live_Streaming
 */
(async () => {
    const { job } = workerData;
    parentPort.postMessage(JSON.stringify({
        status: 'STARTED',
        job
    }));

    let mediaPath = job.data.media.originalUrl.replace(/\\/g, '/');
    const fileSharePath = '/mnt/silverstone';
    mediaPath = join(fileSharePath, mediaPath);

    const filename = mediaPath.split('/').pop();
    if (!filename) throw new Error('No filename found');
    const outDir = join(mediaPath.split('/').slice(0, -1).join('/'), filename.split('.').slice(0, -1).join('.').replace(/\s/g, '.'));

    try {
        await mkdir(outDir);
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }

    const probe = await ffprobe(mediaPath, { path: ffprobeStatic.path });

    const videoStream = probe.streams.find((stream) => stream.codec_type === 'video');
    if (!videoStream) throw new Error('No video stream found');
    const audioStreams = probe.streams.filter((stream) => stream.codec_type === 'audio');
    if (audioStreams.length === 0) throw new Error('No audio stream found');
    const subtitlesStreams = probe.streams.filter((stream) => stream.codec_type === 'subtitle');

    const hdr = videoStream.pix_fmt === 'yuv420p10le';

    const profiles = [];
    if (!hdr) {
        if (videoStream.height >= 480) profiles.push(FFMPEG_480P_PROFILE);
        if (videoStream.height >= 720) profiles.push(FFMPEG_720P_PROFILE);
        if (videoStream.height >= 1080) profiles.push(FFMPEG_1080P_PROFILE);
    } else {
        if (videoStream.height >= 480) profiles.push(FFMPEG_480P_HDR_PROFILE);
        if (videoStream.height >= 720) profiles.push(FFMPEG_720P_HDR_PROFILE);
        if (videoStream.height >= 1080) profiles.push(FFMPEG_1080P_HDR_PROFILE);
    }

    audioStreams.forEach((stream, i) => {
        profiles.push({
            resolution: `audio${i}-${stream.tags.language || 'und'}`,
            options: [
                '-map 0:a:' + i,
                ...FFMPEG_AUDIO_OPTIONS,
            ]
        });
    });

    subtitlesStreams.forEach((stream, i) => {
        profiles.push({
            resolution: `subtitle${i}-${stream.tags.language || 'und'}`,
            options: [
                '-map 0:s:' + i,
                ...FFMPEG_SUBTITLES_OPTIONS,
            ]
        });
    });

    const nbFrames = videoStream.nb_frames || videoStream.tags['NUMBER_OF_FRAMES'] || 1;

    console.log('Transcoding', filename, 'to', profiles.map((profile) => profile.resolution).join(', '), 'in', outDir);

    let instance = ffmpeg()
        .input(mediaPath)
        .addInputOption('-hwaccel cuda');

    instance = (await addOutputs(instance, outDir, filename, profiles))
        .on('start', (commandLine) => {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('error', (err) => {
            parentPort.postMessage({
                status: 'FAILED',
                error: err
            });
        })
        .on('end', async () => {
            endCallback(job, outDir, filename, profiles);
        })
        .on('progress', (progress) => {
            const percent = Math.ceil(progress.frames / nbFrames * 100);

            if (progress.frames && nbFrames) {
                parentPort.postMessage({
                    status: 'PROGRESS',
                    progress: percent
                });
            }
        })
        .run();
})();

async function addOutputs(ffmpeg, outDir, filename, profiles) {
    if (profiles.length === 0) return ffmpeg;
    const [profile, ...rest] = profiles;
    const outFilePath = getFilePath(filename, outDir, profile.resolution);

    ffmpeg
        .output(outFilePath)
        .addOutputOptions([...profile.options]);

    return await addOutputs(ffmpeg, outDir, filename, rest);
}

function getFilePath(filename, outDir, resolution) {
    const ext = resolution.startsWith('audio') ? 'webm' : resolution.startsWith('subtitle') ? 'vtt' : 'webm';

    return join(__dirname, `${filename.split('.').slice(0, -1).join('.').replace(/\s/g, '.')}-${resolution}.${ext}`);
}

function endCallback(job, outDir, filename, profiles) {
    let packagerCmd = [];

    console.log('Packaging', filename, 'to', profiles.map((profile) => profile.resolution).join(', '), 'in', outDir);

    profiles.forEach((profile) => {
        const filePath = getFilePath(filename, outDir, profile.resolution);
        const stream = profile.resolution.startsWith('audio') ? 'audio' : profile.resolution.startsWith('subtitle') ? 'text' : 'video';
        const ext = profile.resolution.startsWith('audio') ? 'webm' : profile.resolution.startsWith('subtitle') ? 'vtt' : 'webm';

        packagerCmd.push(`in="${filePath}",stream=${stream},output="${join(outDir, profile.resolution)}.${ext}"`);
    });

    packagerCmd.push('--generate_dash_if_iop_compliant_mpd=false');
    packagerCmd.push(`--mpd_output "${join(outDir, 'manifest.mpd')}"`);

    console.log('Packager command:', packagerCmd.join(' '));

    const cmd = exec(`packager ${packagerCmd.join(' ')}`);

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('message', (message) => {
        console.log(`message: ${message}`);
    });

    cmd.on('exit', (code) => {
        if (code !== 0) {
            parentPort.postMessage({
                status: 'FAILED',
                error: `Packager exited with code ${code}`
            });
            return;
        }

        job.data.media.url = join(outDir, 'manifest.mpd');

        profiles.forEach(async (profile) => {
            const filePath = getFilePath(filename, outDir, profile.resolution);
            try {
                await rm(filePath);
            } catch (error) {
                console.log('Failed to remove', filePath, error);
            }
        });

        parentPort.postMessage({
            status: 'COMPLETED',
            job
        });
    });
}

const FFMPEG_480P_PROFILE = {
    resolution: '480p',
    options: [
        '-vf scale=640x480',
        '-b:v 750k',
        '-minrate 375k',
        '-maxrate 1088k',
        '-tile-columns 1',
        '-threads 4',
        '-g 240',
        '-quality good',
        '-crf 33',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_480P_HDR_PROFILE = {
    resolution: '480p',
    options: [
        '-vf scale=640x480,zscale=transfer=linear,tonemap=tonemap=clip:param=1.0:desat=2:peak=0,zscale=transfer=bt709,format=yuv420p',
        '-b:v 750k',
        '-minrate 375k',
        '-maxrate 1088k',
        '-tile-columns 1',
        '-threads 4',
        '-g 240',
        '-quality good',
        '-crf 33',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_720P_PROFILE = {
    resolution: '720p',
    options: [
        '-vf scale=1280x720',
        '-b:v 1024k',
        '-minrate 512k',
        '-maxrate 1485k',
        '-tile-columns 2',
        '-threads 8',
        '-g 240',
        '-quality good',
        '-crf 32',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_720P_HDR_PROFILE = {
    resolution: '720p',
    options: [
        '-vf scale=1280x720,zscale=transfer=linear,tonemap=tonemap=clip:param=1.0:desat=2:peak=0,zscale=transfer=bt709,format=yuv420p',
        '-b:v 1024k',
        '-minrate 512k',
        '-maxrate 1485k',
        '-tile-columns 2',
        '-threads 8',
        '-g 240',
        '-quality good',
        '-crf 32',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_1080P_PROFILE = {
    resolution: '1080p',
    options: [
        '-vf scale=1920x1080',
        '-b:v 1800k',
        '-minrate 900k',
        '-maxrate 2610k',
        '-tile-columns 2',
        '-threads 8',
        '-g 240',
        '-quality good',
        '-crf 31',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_1080P_HDR_PROFILE = {
    resolution: '1080p',
    options: [
        '-vf scale=1920x1080,zscale=transfer=linear,tonemap=tonemap=clip:param=1.0:desat=2:peak=0,zscale=transfer=bt709,format=yuv420p',
        '-b:v 1800k',
        '-minrate 900k',
        '-maxrate 2610k',
        '-tile-columns 2',
        '-threads 8',
        '-g 240',
        '-quality good',
        '-crf 31',
        '-c:v libvpx-vp9',
        '-speed 4',
        '-an'
    ]
};

const FFMPEG_AUDIO_OPTIONS = [
    '-c:a libopus',
    '-b:a 128k',
    '-ac 2',
];

const FFMPEG_SUBTITLES_OPTIONS = [
    '-scodec webvtt',
    '-f webvtt'
];
