import { CheckService } from '@domain/use-cases/checks/check.service';
import { CronService } from './cron/cron.service';
import { LogRepositoryImpl } from '../infraestructure/repository/log.repository.impl';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ServerApp {
	static start(): void {
		console.log('Server running...');
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://www.google.com';
			void new CheckService(
				fileSystemRepository,
				() => {
					console.log(`${url} is ok`);
				},
				(error) => {
					console.log(error);
				}
			).execute(url);
		});
	}
}
