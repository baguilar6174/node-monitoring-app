import { type EmailService } from '@presentation/email/email.service';
import { type LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface SendLogEmailUseCase {
	execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmail implements SendLogEmailUseCase {
	constructor(
		private readonly emailService: EmailService,
		private readonly logRepository: LogRepository
	) {}

	async execute(to: string | string[]): Promise<boolean> {
		try {
			const result = await this.emailService.sendEmailWithFileSystemsLogs(to);
			if (!result) throw new Error('Email log was no sent');
			const log = new LogEntity({
				message: 'Log email sent',
				level: LogSeverityLevel.low,
				origin: 'send-email.usecase.ts'
			});
			await this.logRepository.saveLog(log);
			return true;
		} catch (error) {
			const log = new LogEntity({
				message: `Error ${error as string}`,
				level: LogSeverityLevel.high,
				origin: 'send-email.usecase.ts'
			});
			await this.logRepository.saveLog(log);
			return false;
		}
	}
}
