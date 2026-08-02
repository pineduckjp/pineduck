import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email"),
  userId: text("user_id"),
  userName: text("user_name"),
  app: text("app"),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  sentToAdmin: int("sent_to_admin").default(0),
});

export const androidMvpRequests = sqliteTable("android_mvp_requests", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  sentToAdmin: int("sent_to_admin").default(0),
});
