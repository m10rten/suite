import { define } from "@mvdlei/env";
import { t } from "@mvdlei/tzod";
import { z } from "zod";

export const env = define({
  env: {
    NODE_ENV: z
      .enum(["development", "production", "test"] as const)
      .default("development")
      .transform((val) => t.string.lower(val)),
    DATABASE_URL: z
      .string()
      .default("postgres://postgres:postgres@localhost:5433/reyn_db"),
    SHADOW_DATABASE_URL: z
      .string()
      .default("postgres://postgres:postgres@localhost:5433/reyn_db"),
    REDIS_URL: z.string().default("redis://localhost:6380"),
  },
  prefix: "INTERNAL_",
  prefixed: {
    INTERNAL_LOG_LEVEL: z
      .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"] as const)
      .default("info")
      .transform((val) => t.string.lower(val)),
  },
});
