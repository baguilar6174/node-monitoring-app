import { CronService } from './cron/cron.service';
import { LogRepositoryImpl } from '@infraestructure/repository/log.repository.impl';
import { FileSystemDatasource } from '@infraestructure/datasources/file-system.datasource';
import { MongoDatasource } from '@infraestructure/datasources/mongo.datasource';
import { PostgresDatasource } from '@infraestructure/datasources/postgres.datasource';
import { CheckServiceMultiple } from '@domain/use-cases/checks/check-multiple.service';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ServerApp {
	static start(): void {
		console.log('Server running...');
		// * Here you can send the email
		CronService.createJob('*/5 * * * * *', (): void => {
			const url = 'https://www.google.com';
			// * Using one Data source
			/* void new CheckService(
				new LogRepositoryImpl(new FileSystemDatasource()),
				() => {
					console.log(`${url} is ok`);
				},
				(error) => {
					console.log(error);
				}
			).execute(url); */
			// * Use multiple Data sources
			void new CheckServiceMultiple(
				[
					new LogRepositoryImpl(new FileSystemDatasource()),
					new LogRepositoryImpl(new MongoDatasource()),
					new LogRepositoryImpl(new PostgresDatasource())
				],
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
