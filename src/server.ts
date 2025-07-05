process.on("uncaughtException", (error) => {
  console.error(`uncaughtException: ${error.message}`);
  if (error instanceof Error) console.error(error.stack);
  process.exit(1);
});

import app from "./app";
import CONFIG from "./config/config";
import connectDB from "./database/connection";

const { PORT, NODE_ENV, DB_URI } = CONFIG;

/* ------------------ Start Server ------------------ */
const server = app.listen(PORT, async () => {
  await connectDB(DB_URI);
  console.log(`Server running on Port: ${PORT} - Mode: ${NODE_ENV}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
  if (reason instanceof Error) console.error(reason.stack);
  server.close(() => {
    console.error("Server closed");
    process.exit(1);
  });
});
