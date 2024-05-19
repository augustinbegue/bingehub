import { seedDatabase } from './tasks/seedDatabase';
import { checkForNewJobs } from './tasks/checkForNewJobs';
import { importNewMedia } from './tasks/importNewMedia';
import { refreshSubscriptions } from './tasks/refreshSubscriptions';
import { log } from './logger';
import tasks from "./tasks.json"

log.info(`Starting CMS`);

export interface ScheduledTask {
	name: string;
	run: () => Promise<void>;
	interval: number;
}

export const taskMap: { [key: string]: ScheduledTask["run"] } = {
	"seedDatabase": seedDatabase,
	"checkForNewJobs": checkForNewJobs,
	"importNewMedia": importNewMedia,
	"refreshSubscriptions": refreshSubscriptions
}

export const scheduledTasks: ScheduledTask[] = tasks.map((task) => {
	log.info(`Loading task ${task.name} with interval ${task.interval}ms: ${taskMap[task.run]?.name}`)

	return {
		name: task.name,
		run: taskMap[task.run],
		interval: task.interval
	}
});

scheduledTasks.forEach((task) => {
	if (task.interval !== 0) {
		log.info(`Scheduling task ${task.name} to run every ${task.interval}ms`);
		setInterval(task.run, task.interval);
	}
	task.run();
});
