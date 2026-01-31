import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config";
import { PrismaClient } from "./generated/client";

const connectionString = `${config.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };
