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
ALTER TABLE "users" RENAME COLUMN "upadatedat" TO "upadated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdat" TO "created_at";