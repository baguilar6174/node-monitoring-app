import { type LogRepository } from '@domain/repository/log.repository';
import { type LogEntity, type LogSeverityLevel } from '@domain/entities/log.entity';
import { type LogDatasource } from '@domain/datasources/log.datasource';

export class LogRepositoryImpl implements LogRepository {
	constructor(private readonly logDatasource: LogDatasource) {}

	async saveLog(log: LogEntity): Promise<void> {
		await this.logDatasource.saveLog(log);
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		return await this.logDatasource.getLogs(severityLevel);
	}
}
