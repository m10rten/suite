import { createClient } from "redis";

import { env } from "./env";
import { logger } from "./log";

export const create = async () => {
  const client = await createClient({
    url: env.REDIS_URL,
    database: 0,
  })
    .on("error", (error) => {
      logger.error(error);
    })
    .connect();

  return {
    client,
    [Symbol.dispose]: async () => {
      await client.disconnect();
    },
  };
};
