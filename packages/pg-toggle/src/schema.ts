import { boolean, date, pgSchema, serial, text } from "drizzle-orm/pg-core";

export const schema = pgSchema("toggles");

/**
 * Table for toggles.
 * id: id of the toggle
 * name: name of the toggle
 * enabled: whether the toggle is enabled or not
 * deleted: whether the toggle is deleted or not
 * created_at: when the toggle was created
 * updated_at: when the toggle was updated
 * deleted_at: when the toggle was deleted
 */
export const toggle = schema.table("toggle", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  enabled: boolean("enabled").notNull().default(false),
  deleted: boolean("deleted").notNull().default(false),
  created_at: date("created_at").notNull().defaultNow(),
  updated_at: date("updated_at").notNull().defaultNow(),
  deleted_at: date("deleted_at"),
});
