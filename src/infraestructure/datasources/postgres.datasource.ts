import { type LogDatasource } from '@domain/datasources/log.datasource';
import { type LogSeverityLevel, LogEntity } from '@domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prisma = new PrismaClient();

const severityEnum = {
	low: SeverityLevel.LOW,
	medium: SeverityLevel.MEDIUM,
	high: SeverityLevel.HIHG
};

export class PostgresDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const level = severityEnum[log.level];
		await prisma.logModel.create({ data: { ...log, level } });
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const level = severityEnum[severityLevel];
		const logs = await prisma.logModel.findMany({ where: { level } });
		return logs.map((log) => LogEntity.fromObject(log));
	}
}
