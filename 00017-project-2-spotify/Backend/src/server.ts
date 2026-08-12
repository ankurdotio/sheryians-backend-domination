/**
 * Server entrypoint.
 */
import { createApp } from "./app/app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const app = createApp();

let server: ReturnType<typeof app.listen> | undefined;

async function startServer(): Promise<void> {
  await connectDatabase();
  server = app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });
}

function shutdown(signal: NodeJS.Signals): void {
  console.log(`Received ${signal}, shutting down...`);
  server?.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
