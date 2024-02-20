import { define } from "@mvdlei/env";
import { t } from "@mvdlei/tzod";
import { z } from "zod";

export const env = define({
  env: {
    NODE_ENV: z
      .enum(["development", "production", "test"] as const)
      .default("development")
      .transform((val) => t.string.lower(val)),
  },
  prefix: "INTERNAL_",
  prefixed: {
    INTERNAL_LOG_LEVEL: z
      .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"] as const)
      .default("info")
      .transform((val) => t.string.lower(val)),
  },
});
