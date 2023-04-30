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
const runningJobs: cmsJob[] = [];

// Check for new jobs every 30 seconds
setInterval(async () => {
	await checkForNewJobs();
}, 30_000);
checkForNewJobs();

async function checkForNewJobs() {
	const jobs = await prisma.job.findMany({
		where: {
			OR: [
				{
					status: {
						notIn: ['COMPLETED']
					}
				}
			],
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
							type: true
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
			log.info(`Job ${job.uid} started`);
		} else if (message.status === 'COMPLETED') {
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

			const index = runningJobs.findIndex((j) => j.uid === job.uid);
			if (index !== -1) {
				runningJobs.splice(index, 1);
			}
		} else if (message.status === 'PROGRESS') {
			await prisma.job.update({
				where: {
					uid: job.uid
				},
				data: {
					progress: message.progress
				}
			});
		} else if (message.status === 'FAILED') {
			log.error(`Job ${job.uid} failed: `, message.error);

			await prisma.job.update({
				where: {
					uid: job.uid
				},
				data: {
					status: 'FAILED',
					error: message.error.toString()
				}
			});

			const index = runningJobs.findIndex((j) => j.uid === job.uid);
			if (index !== -1) {
				runningJobs.splice(index, 1);
			}
		}
	});

	worker.on('error', async (err) => {
		log.error(`Job ${job.uid} failed`, err);
		await prisma.job.update({
			where: {
				uid: job.uid
			},
			data: {
				status: 'FAILED',
				error: err.toString()
			}
		});
	});
}
