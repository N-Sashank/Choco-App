CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lname" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"provider" varchar(20) NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"imageurl" text,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"upadatedat" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"createdat" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
