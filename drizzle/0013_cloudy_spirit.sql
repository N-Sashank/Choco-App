ALTER TABLE "orders" RENAME TO "Orders";--> statement-breakpoint
ALTER TABLE "delivery_persons" DROP CONSTRAINT "delivery_persons_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "status" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "type" varchar(6) DEFAULT 'quick';--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "product_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "qty" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "Orders" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
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
