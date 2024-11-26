ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_pincode_unique" UNIQUE("pincode");