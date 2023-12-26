import nodemailer from 'nodemailer';
import { envs } from '@config/plugins/env.plugin';

interface Attachement {
	filename: string;
	path: string;
}

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachement[];
}

export class EmailService {
	private readonly transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY
		}
	});

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;
		try {
			const sendInformation = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments
			});
			console.log(sendInformation);
			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithFileSystemsLogs(to: string | string[]): Promise<boolean> {
		const subject = 'Server logs';
		const htmlBody = `
      <h3>NOC Logs</h3>
      <p>System logs</p>
      <p>See attachments</p>
    `;
		const attachments: Attachement[] = [
			{ filename: 'logs-all.log', path: './logs/logs-all.log' },
			{ filename: 'logs-high.log', path: './logs/logs-high.log' },
			{ filename: 'logs-medium.log', path: './logs/logs-medium.log' }
		];
		return await this.sendEmail({ to, subject, attachments, htmlBody });
	}
}
