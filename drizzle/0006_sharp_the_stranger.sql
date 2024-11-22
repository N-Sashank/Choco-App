ALTER TABLE "Inventory" RENAME TO "inventory";--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "Inventory_sku_unique";--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "Inventory_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "Inventory_produt_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "Inventory_warehouse_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "produt_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "warehouse_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
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
--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_sku_unique" UNIQUE("sku");