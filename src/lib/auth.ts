import { config } from "../config";
import { db } from "../db";
import { betterAuth, string } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

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
