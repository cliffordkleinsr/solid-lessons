import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  password: text().notNull().unique(),
});

export type UserInsert = typeof usersTable.$inferInsert;
