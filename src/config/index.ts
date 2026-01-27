import dotenv from "dotenv";
import path from "path";

const currentPath = path.join(__dirname, "../../.env");
dotenv.config({
  path: currentPath,
});

export const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
