"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const config_1 = require("@/config");
const db_1 = require("@/db");
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
exports.auth = (0, better_auth_1.betterAuth)({
    rateLimit: {
        enabled: true,
        window: 10,
        max: 100,
    },
    database: (0, prisma_1.prismaAdapter)(db_1.db, {
        provider: "postgresql",
    }),
    trustedOrigins: [config_1.config.APP_URL],
    user: {
        additionalFields: {
            role: {
                type: ["customer", "provider", "admin"],
                required: false,
                defaultValue: "customer",
            },
            phone: {
                type: "string",
                required: true,
            },
            address: {
                type: "string",
                required: false,
            },
            status: {
                type: ["activate", "suspend"],
                required: false,
                defaultValue: "activate",
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
    },
});
