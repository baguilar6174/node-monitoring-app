import { CronJob } from 'cron';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ServerApp {
	static start(): void {
		console.log('Server running...');

		const job = new CronJob(
			'* * * * * *', // cronTime
			() => {
				console.log('You will see this message every second');
			}
		);
		job.start();
	}
}
