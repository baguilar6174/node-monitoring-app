import { type LogSeverityLevel, type LogEntity } from '../entities/log.entity';

export abstract class LogDatasource {
	abstract saveLog(log: LogEntity): Promise<void>;
	abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
