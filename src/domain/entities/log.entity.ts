export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

interface LogOptions {
	level: LogSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(options: LogOptions) {
		const { message, level, origin, createdAt = new Date() } = options;
		this.message = message;
		this.level = level;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	static fromJSON(json: string): LogEntity {
		json = json === '' ? '{}' : json;
		const { message, level, createdAt, origin } = JSON.parse(json);
		const log = new LogEntity({
			message: message as string,
			level: level as LogSeverityLevel,
			origin: origin as string,
			createdAt
		});
		return log;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static fromObject(object: Record<string, any>): LogEntity {
		const { message, level, origin, createdAt } = object;
		const log = new LogEntity({
			message: message as string,
			level: level as LogSeverityLevel,
			origin: origin as string,
			createdAt
		});
		return log;
	}
}
