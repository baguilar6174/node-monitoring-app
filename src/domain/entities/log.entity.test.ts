import { LogEntity, LogSeverityLevel } from './log.entity';

describe('Tests on log.entity.ts', () => {
	test('should create a LogEntity instance', () => {
		const log = new LogEntity({
			message: 'message',
			level: LogSeverityLevel.low,
			origin: 'log.entity.test.ts'
		});

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe('message');
		expect(log.level).toBe(LogSeverityLevel.low);
		expect(log.origin).toBe('log.entity.test.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('should create a LogEntity instance from JSON', () => {
		const json = `{"level":"low","message":"Service https://www.google.com working","createdAt":"2023-12-29T20:59:00.454Z","origin":"check.service.ts"}`;

		const log = LogEntity.fromJSON(json);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe('Service https://www.google.com working');
		expect(log.level).toBe(LogSeverityLevel.low);
		expect(log.origin).toBe('check.service.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('should create a LogEntity instance from object', () => {
		const obj = {
			message: 'message',
			level: LogSeverityLevel.low,
			origin: 'log.entity.test.ts'
		};

		const log = LogEntity.fromObject(obj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe('message');
		expect(log.level).toBe(LogSeverityLevel.low);
		expect(log.origin).toBe('log.entity.test.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});
});
