import { prisma } from '$lib/server/database/prisma';
import { Logger } from 'tslog';

const log = new Logger({
	name: 'CMS',
	prettyLogTemplate:
		'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t'
});

log.info(`Starting CMS`);

// Check for new jobs every 30 seconds
setInterval(async () => {
	await checkForNewJobs();
}, 30_000);
checkForNewJobs();

async function checkForNewJobs() {
	log.info(`Checking for new jobs`);

	const jobs = await prisma.job.findMany({
		where: {
			status: 'QUEUED'
		}
	});

	log.info(`Found ${jobs.length} new jobs`);
}
