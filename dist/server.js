var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "./config/index.js";
import { db } from "./db/index.js";
import app from "./index.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(config.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
            yield db.$connect();
            console.log("🚀 DB connected 🚀");
            console.log(`🚀 Server started on http://localhost:${config.PORT} 🚀`);
        }));
    }
    catch (err) {
        const error = err instanceof Error ? err.message : "connection loss";
        console.error("❌ Server failed to start:", error);
        yield db.$disconnect();
        process.exit(1);
    }
}))();
