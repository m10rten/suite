import { z } from "zod";

import { procedure, router } from "./trpc";

const app = router({
  echo: procedure.input(z.string()).query(async (opts) => {
    return `Hello ${opts.input}!`;
  }),
});

export type App = typeof app;
