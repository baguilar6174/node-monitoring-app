// import fetch from 'cross-fetch';
import { type LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface CheckServiceMultipleUseCase {
	execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
	constructor(
		private readonly logRepository: LogRepository[],
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback
	) {}

	private callLogRepositories(log: LogEntity): void {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		this.logRepository.forEach(async (repository) => {
			await repository.saveLog(log);
		});
	}

	async execute(url: string): Promise<boolean> {
		try {
			const request = await fetch(url);
			if (!request.ok) throw new Error(`Error on check service ${url}`);
			const log = new LogEntity({
				message: `Service ${url} working`,
				level: LogSeverityLevel.low,
				origin: 'check.service.ts'
			});
			this.callLogRepositories(log);
			this.successCallback();
			return true;
		} catch (error) {
			const message = `${url} is not ok, ${error as string}`;
			this.errorCallback(message);
			const log = new LogEntity({
				message,
				level: LogSeverityLevel.high,
				origin: 'check.service.ts'
			});
			this.callLogRepositories(log);
			return false;
		}
	}
}
