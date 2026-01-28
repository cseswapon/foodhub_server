import { config } from "@/config/index";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "../../node_modules/@prisma/adapter-pg/dist/index";
const connectionString = `${config.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });
export { db };
