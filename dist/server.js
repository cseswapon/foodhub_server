"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./config/index.js");
const index_js_2 = require("./db/index.js");
const index_js_3 = __importDefault(require("./index.js"));
(async () => {
    try {
        index_js_3.default.listen(index_js_1.config.PORT, async () => {
            await index_js_2.db.$connect();
            console.log("🚀 DB connected 🚀");
            console.log(`🚀 Server started on http://localhost:${index_js_1.config.PORT} 🚀`);
        });
    }
    catch (err) {
        const error = err instanceof Error ? err.message : "connection loss";
        console.error("❌ Server failed to start:", error);
        await index_js_2.db.$disconnect();
        process.exit(1);
    }
})();
