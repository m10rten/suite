CREATE SCHEMA "toggles";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "toggles"."toggle" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"deleted_at" date,
	CONSTRAINT "toggle_name_unique" UNIQUE("name")
);
