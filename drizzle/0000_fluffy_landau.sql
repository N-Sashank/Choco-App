CREATE TABLE IF NOT EXISTS "Orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"status" varchar(10) NOT NULL,
	"type" varchar(6) DEFAULT 'quick',
	"price" integer NOT NULL,
	"address" text NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "delivery_persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(13) NOT NULL,
	"warehouse_id" integer NOT NULL,
	"order_id" integer,
	"upadated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "delivery_persons_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar(8) NOT NULL,
	"order_id" integer,
	"produt_id" integer NOT NULL,
	"warehouse_id" integer NOT NULL,
	"upadated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "inventory_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"imageurl" text,
	"description" text,
	"price" integer NOT NULL,
	"upadated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lname" varchar(100),
	"email" varchar(100) NOT NULL,
	"provider" varchar(20) NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"imageurl" text,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"upadated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"pincode" varchar(6) NOT NULL,
	"upadated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "warehouses_name_unique" UNIQUE("name"),
	CONSTRAINT "warehouses_pincode_unique" UNIQUE("pincode")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_order_id_Orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_order_id_Orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_produt_id_products_id_fk" FOREIGN KEY ("produt_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
