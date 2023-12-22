import { ServerApp } from '@presentation/server';

void (async () => {
	await main();
})();

async function main(): Promise<void> {
	ServerApp.start();
}
