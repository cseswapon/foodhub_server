import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config/index.js";
import { PrismaClient } from "./generated/client.js";

const connectionString = `${config.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };
