import moongose from 'mongoose';

interface ConnectionOptions {
	mongoUrl: string;
	dbName: string;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongoDatabase {
	static async connect(options: ConnectionOptions): Promise<boolean> {
		const { mongoUrl, dbName } = options;
		try {
			await moongose.connect(mongoUrl, {
				dbName
			});
			return true;
		} catch (error) {
			throw error;
		}
	}
}
