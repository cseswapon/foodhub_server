import { betterAuth, string } from "better-auth";
import { db } from "../db/index.js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { config } from "../config/index.js";

export const auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  trustedOrigins: [config.APP_URL!],

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
      status: {
        type: ["active", "inactive"],
        required: false,
        defaultValue: "active",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
});
