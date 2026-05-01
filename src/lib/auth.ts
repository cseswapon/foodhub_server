import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../db";
import { config } from "../config";

export const auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,

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
    config.APP_URL,
    config.BACKEND_URL,
  ].filter((origin): origin is string => Boolean(origin)),

  /* advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  }, */

  /* hooks: {
    after: async (ctx: any) => { 
      const setCookie = ctx.response.headers.get("set-cookie");
      if (setCookie && process.env.NODE_ENV === "production") {
        const newCookie = setCookie.replace(
          /SameSite=Lax/g,
          "SameSite=None; Secure",
        );
        ctx.response.headers.set("set-cookie", newCookie);
      }
      return ctx;
    }
  }, */

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
