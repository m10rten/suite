import { define } from "@mvdlei/env";
import { type Level } from "@mvdlei/log";
import { z } from "zod";

export const env = define({
  env: {
    NODE_ENV: z
      .string()
      .default("development")
      .transform((val) => val.toLowerCase()),
  },
  prefix: "INTERNAL_",
  prefixed: {
    INTERNAL_LOG_LEVEL: z
      .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"] as const)
      .default("info")
      .transform((val) => val.toLowerCase() as Level),
  },
});
