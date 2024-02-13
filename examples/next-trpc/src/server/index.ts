import { z } from "zod";

import { procedure, router } from "./trpc";

export const appRouter = router({
  echo: procedure.input(z.string()).query(async (opts) => {
    return `Hello ${opts.input}!`;
  }),
});

export type AppRouter = typeof appRouter;
