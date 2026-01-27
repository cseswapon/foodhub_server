import { config } from "./config/index.js";
import { db } from "./db/index.js";
import app from "./index.js";

(async () => {
  try {
    app.listen(config.PORT, async () => {
      await db.$connect();
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
