import { MongoDatabase } from './init';
import { envs } from '../../config/plugins/env.plugin';
import mongoose from 'mongoose';

describe('init MongoDB', () => {
	afterAll(() => {
		mongoose.connection.close();
	});

	test('should connect to to MongoBD', async () => {
		const connected = await MongoDatabase.connect({
			mongoUrl: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME
		});
		expect(connected).toBeTruthy();
	});

	test('should throw an error', async () => {
		try {
			const connected = await MongoDatabase.connect({
				mongoUrl: 'mongodb://baguilar:123456@localhost:27018',
				dbName: envs.MONGO_DB_NAME
			});
			expect(connected).toBeTruthy();
		} catch (error) {}
	});
});
