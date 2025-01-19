import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("user_id").primaryKey(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }),
  email: varchar("email", { length: 100 }).unique().notNull(),
  provider: varchar("provider", { length: 20 }).notNull(),
  external_id: varchar("external_id", { length: 100 }).notNull(),
  image: text("imageurl"),
  role: varchar("role", { length: 12 }).notNull().default("customer"),
  updatedat: timestamp("upadated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdat: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("imageurl"),
  description: text("description"),
  price: integer("price").notNull(),
  updatedat: timestamp("upadated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdat: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const warehousesTable = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  pincode: varchar("pincode", { length: 6 }).notNull().unique(),
  updatedat: timestamp("upadated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdat: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const OrdersTable = pgTable("Orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  status: varchar("status", { length: 10 }).notNull(),
  type: varchar("type", { length: 6 }).default("quick"),
  price: integer("price").notNull(),
  address: text("address").notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id, { onDelete: "no action" })
    .notNull(),
  quantity: integer("quantity").notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const delivery_personsTable = pgTable("delivery_persons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 13 }).notNull().unique(),
  warehouse_id: integer("warehouse_id")
    .references(() => warehousesTable.id, { onDelete: "cascade" })
    .notNull(),
  order_id: integer("order_id").references(() => OrdersTable.id, {
    onDelete: "set null",
  }),
  updatedat: timestamp("upadated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdat: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const inventoryTable = pgTable("inventory", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 8 }).unique().notNull(),
  order_id: integer("order_id").references(() => OrdersTable.id, {
    onDelete: "set null",
  }),
  product_id: integer("produt_id")
    .references(() => productsTable.id, { onDelete: "cascade" })
    .notNull(),
  warehouse_id: integer("warehouse_id")
    .references(() => warehousesTable.id, { onDelete: "cascade" })
    .notNull(),
  updatedat: timestamp("upadated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdat: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
