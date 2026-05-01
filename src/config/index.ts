import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

  BACKEND_URL: process.env.BACKEND_URL,
  APP_URL: process.env.APP_URL,

  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
};
