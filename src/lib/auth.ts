import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../db";
import { config } from "dotenv";

config();
export const auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-client-eight.vercel.app",
  ],

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "provider", "admin"],
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
