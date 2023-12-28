import 'dotenv/config';
import { ServerApp } from '@presentation/server';
import { LogModel, MongoDatabase } from './data/mongodb';
import { envs } from './config/plugins/env.plugin';
import { LogEntity, LogSeverityLevel } from './domain/entities/log.entity';

void (async () => {
	await main();
})();

async function main(): Promise<void> {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});
	/* const logEntity = new LogEntity({
		message: 'Test',
		level: LogSeverityLevel.low,
		origin: 'check.service.ts'
	});
	const log = await LogModel.create(logEntity);
	await log.save();
	console.log(log); */
	const logs = await LogModel.find();
	console.log(logs);
	// ServerApp.start();
}
