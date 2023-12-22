import { ServerApp } from "./presentation/server";

(async (): Promise<void> => {
  await main();
})()

async function main(): Promise<void> {
  ServerApp.start();
}