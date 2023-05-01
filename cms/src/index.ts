import { prisma } from '$lib/server/database/prisma';
import { Logger } from 'tslog';
import { type Job, MediaType } from '@prisma/client';
import { Worker } from 'worker_threads';

const log = new Logger({
	name: 'CMS',
	prettyLogTemplate:
		'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t'
});

log.info(`Starting CMS`);

export interface cmsJob {
	uid: string;
	data: Job & {
		media: {
			uid: string;
			type: MediaType;
			url: string;
		};
	};
}

const maxConcurrentJobs = 4;
let runningJobs: cmsJob[] = [];

// Check for new jobs every 30 seconds
setInterval(async () => {
	await checkForNewJobs();
}, 30_000);
checkForNewJobs();

async function checkForNewJobs() {
	const jobs = await prisma.job.findMany({
		where: {
			status: {
				notIn: ['COMPLETED', 'FAILED']
			},
			isDeleted: false,
			isActive: true
		},
		orderBy: {
			createdAt: 'asc'
		}
	});

	for (const dbJob of jobs) {
		if (!runningJobs.find((j) => j.uid === dbJob.uid) && runningJobs.length < maxConcurrentJobs) {
			log.info(`Starting job ${dbJob.uid}`);

			const res = await prisma.job.update({
				where: {
					uid: dbJob.uid
				},
				data: {
					status: 'RUNNING'
				},
				include: {
					media: {
						select: {
							uid: true,
							url: true,
							type: true,
							thumbnailDataUrl: true,
							originalUrl: true
						}
					}
				}
			});

			const job: cmsJob = {
				uid: dbJob.uid,
				data: res
			};
			runningJobs.push(job);

			await runJob(job);
		}
	}
}

async function runJob(job: cmsJob) {
	let jobPath = '';

	switch (job.data.type) {
		case 'THUMBNAIL':
			jobPath = __dirname + '/jobs/thumbnail.js';
			break;
		case 'TRANSCODE':
			jobPath = __dirname + '/jobs/transcode.js';
			break;
		default:
			log.error(`Unknown job type ${job.data.type}`);

			await prisma.job.update({
				where: {
					uid: job.uid
				},
				data: {
					status: 'FAILED',
					error: `Unknown job type ${job.data.type}`
				}
			});
			return;
	}

	const worker = new Worker(jobPath, {
		workerData: {
			job
		}
	});
	worker.on('message', async (message) => {
		if (message.status === 'STARTED') {
			onJobStart(job);
		} else if (message.status === 'COMPLETED') {
			await onJobComplete(job, message);
		} else if (message.status === 'PROGRESS') {
			await onJobProgress(job, message);
		} else if (message.status === 'FAILED') {
			await onJobFail(job, message.error);
		}
	});

	worker.on('error', async (err) => {
		onJobFail(job, err);
	});
}
async function onJobProgress(job: cmsJob, message: any) {
	await prisma.job.update({
		where: {
			uid: job.uid
		},
		data: {
			progress: message.progress
		}
	});
}

async function onJobFail(job: cmsJob, error: any) {
	log.error(`Job ${job.uid} failed: `, error);

	await prisma.job.update({
		where: {
			uid: job.uid
		},
		data: {
			status: 'FAILED',
			error: error.toString()
		}
	});

	runningJobs = runningJobs.filter((j) => j.uid !== job.uid);
}

function onJobStart(job: cmsJob) {
	log.info(`Job ${job.uid} started`);
}

async function onJobComplete(job: cmsJob, message: any) {
	log.info(`Job ${job.uid} completed`);

	await prisma.job.update({
		where: {
			uid: job.uid
		},
		data: {
			status: 'COMPLETED',
			media: {
				update: {
					...message.job.data.media
				}
			}
		}
	});

	await prisma.media.updateMany({
		where: {
			AND: [
				{
					uid: job.data.media.uid
				},
				{
					thumbnailDataUrl: {
						not: null
					}
				},
				{
					url: {
						endsWith: '.mpd'
					}
				}
			]
		},
		data: {
			isActive: true
		}
	});

	await prisma.post.updateMany({
		where: {
			media: {
				AND: [
					{
						uid: job.data.media.uid
					},
					{
						thumbnailDataUrl: {
							not: null
						}
					},
					{
						url: {
							endsWith: '.mpd'
						}
					}
				]
			}
		},
		data: {
			isActive: true
		}
	});

	runningJobs = runningJobs.filter((j) => j.uid !== job.uid);
}
