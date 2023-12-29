import { ServerApp } from '@presentation/server';
import { MongoDatabase } from '@data/mongodb';
import { envs } from '@config/plugins/env.plugin';

void (async (): Promise<void> => {
	await main();
})();

async function main(): Promise<void> {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});
	ServerApp.start();
}
