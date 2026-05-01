import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

  BACKEND_URL: process.env.BACKEND_URL,
  APP_URL: process.env.APP_URL,

  OPEN_ROUTER: {
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY,
    OPEN_ROUTER_EMBEDDING_MODEL: process.env.OPEN_ROUTER_EMBEDDING_MODEL,
    OPEN_ROUTER_TEXT_MODEL: process.env.OPEN_ROUTER_TEXT_MODEL,
  },

  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
};
