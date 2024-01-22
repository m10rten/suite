import type { Config } from "drizzle-kit";

const config: Config = {
  out: "./drizzle",
  driver: "pg",
  schema: "./src/schema.ts",
};

export default config;
