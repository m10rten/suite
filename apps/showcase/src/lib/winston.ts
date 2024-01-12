import { create } from "@mvdlei/log";

import { env } from "./env";

export const winston = create({
  level: env.NODE_ENV === "production" ? "info" : env.INTERNAL_LOG_LEVEL ?? "info",
});
