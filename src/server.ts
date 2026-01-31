
import app from "./app";
import { config } from "./config";
import { db } from "./db";

(async () => {
  try {
    await db.$connect();
    app.listen(config.PORT, async () => {
      console.log("🚀 DB connected 🚀");
      console.log(`🚀 Server started on http://localhost:${config.PORT} 🚀`);
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "connection loss";
    console.error("❌ Server failed to start:", error);
    await db.$disconnect();
    process.exit(1);
  }
})();
