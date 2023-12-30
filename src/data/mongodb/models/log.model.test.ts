import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/env.plugin';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('log.model.ts', () => {
	beforeAll(async () => {
		await MongoDatabase.connect({
			mongoUrl: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME
		});
	});

	afterAll(() => {
		mongoose.connection.close();
	});

	test('should return LogModel', async () => {
		const data = {
			origin: 'log.model.test.ts',
			message: 'Test',
			level: 'low'
		};

		const log = await LogModel.create(data);

		expect(log).toEqual(
			expect.objectContaining({
				...data,
				createdAt: expect.any(Date),
				id: expect.any(String)
			})
		);

		await LogModel.findByIdAndDelete(log.id);
	});

	test('should return the schema object', async () => {
		const schema = LogModel.schema.obj;
		expect(schema).toEqual(
			expect.objectContaining({
				level: {
					type: expect.any(Function),
					enum: ['low', 'medium', 'high'],
					default: 'low'
				},
				message: { type: expect.any(Function), required: true },
				origin: { type: expect.any(Function) },
				createdAt: expect.any(Object)
			})
		);
	});
});
