import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

if (!process.env.DB_FILE_NAME) throw new Error("DATABASE_URL is not set");
const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle({ client, casing: "snake_case" });
