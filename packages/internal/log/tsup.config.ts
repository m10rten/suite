import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entry: ["./index.ts"],
  clean: !opts.watch,
}));
