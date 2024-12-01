ALTER TABLE "delivery_persons" ALTER COLUMN "warehouse_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_phone_unique" UNIQUE("phone");