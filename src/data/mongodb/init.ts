import moongose from 'mongoose';

interface ConnectionOptions {
	mongoUrl: string;
	dbName: string;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongoDatabase {
	static async connect(options: ConnectionOptions): Promise<void> {
		const { mongoUrl, dbName } = options;
		try {
			await moongose.connect(mongoUrl, {
				dbName
			});
			console.log('Mongo connected');
		} catch (error) {
			console.log('Mongo connection error');
			throw error;
		}
	}
}
