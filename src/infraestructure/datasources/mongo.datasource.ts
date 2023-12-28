import { type LogDatasource } from '@domain/datasources/log.datasource';
import { type LogSeverityLevel, LogEntity } from '@domain/entities/log.entity';
import { LogModel } from '@data/mongodb';

export class MongoDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create(log);
		await newLog.save();
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({
			level: severityLevel
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return logs.map((log) => LogEntity.fromObject(log));
	}
}
