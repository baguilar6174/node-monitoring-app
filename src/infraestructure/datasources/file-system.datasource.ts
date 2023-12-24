import { type LogDatasource } from '@domain/datasources/log.datasource';
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {
	private readonly logPath = 'logs/';
	private readonly allLogsPath = 'logs/logs-all.log';
	private readonly mediumLogsPath = 'logs/logs-medium.log';
	private readonly highLogsPath = 'logs/logs-high.log';

	constructor() {
		this.createLogsFiles();
	}

	private createLogsFiles(): void {
		if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);
		[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
			if (fs.existsSync(path)) return;
			fs.writeFileSync(path, '');
		});
	}

	async saveLog(log: LogEntity): Promise<void> {
		const logAsJSON = `${JSON.stringify(log)}\n`;

		fs.appendFileSync(this.allLogsPath, logAsJSON);
		if (log.level === LogSeverityLevel.low) return;
		if (log.level === LogSeverityLevel.medium) {
			fs.appendFileSync(this.mediumLogsPath, logAsJSON);
			return;
		}
		fs.appendFileSync(this.highLogsPath, logAsJSON);
	}

	private getLogsFromFile(path: string): LogEntity[] {
		const content = fs.readFileSync(path, 'utf-8');
		const logs = content.split('\n').map((log) => LogEntity.fromJSON(log));
		return logs;
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		switch (severityLevel) {
			case LogSeverityLevel.low:
				return this.getLogsFromFile(this.allLogsPath);
			case LogSeverityLevel.medium:
				return this.getLogsFromFile(this.mediumLogsPath);
			case LogSeverityLevel.high:
				return this.getLogsFromFile(this.highLogsPath);
			default:
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new Error(`${severityLevel} not implemented`);
		}
	}
}
