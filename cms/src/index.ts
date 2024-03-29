import { seedDatabase } from './tasks/seedDatabase';
import { checkForNewJobs } from './tasks/checkForNewJobs';
import { refreshSubscriptions } from './tasks/refreshSubscriptions';
// import { importNewMedia } from './tasks/importNewMedia';
import { log } from './logger';

log.info(`Starting CMS`);

export interface ScheduledTask {
	name: string;
	run: () => Promise<void>;
	interval: number;
}

export const scheduledTasks: ScheduledTask[] = [
	{
		name: 'Seed database',
		run: seedDatabase,
		interval: 0 // One time
	},
	{
		name: 'Check for new jobs',
		run: checkForNewJobs,
		interval: 30_000 // 30 seconds
	},
	{
		name: 'Refresh subscriptions',
		run: refreshSubscriptions,
		interval: 1000 * 60 * 60 * 24 // 1 day
	},
	// {
	// 	name: 'Check for new media',
	// 	run: importNewMedia,
	// 	interval: 1000 * 60 * 60 // 1 hour
	// }
];

// Check for new jobs every 30 seconds
scheduledTasks.forEach((task) => {
	if (task.interval !== 0) {
		log.info(`Scheduling task ${task.name} to run every ${task.interval}ms`);
		setInterval(task.run, task.interval);
	}
	task.run();
});
