import * as fs from "fs/promises";
import * as path from "path";

const entrypointDir = path.join(__dirname, "../", "src");
const distDir = path.join(__dirname, "../", "dist");

const run = async () => {
  try {
    await fs.mkdir(distDir);
  } catch (e) {
    /* empty */
  }

  const entrypoints = await fs.readdir(entrypointDir);

  for (const entrypoint of entrypoints) {
    if (!entrypoint.endsWith(".d.ts")) continue;
    const entrypointBase = entrypoint.replace(".d.ts", "");

    await Promise.all([
      fs.writeFile(path.join(distDir, `${entrypointBase}.js`), ""),
      fs.writeFile(path.join(distDir, `${entrypointBase}.mjs`), ""),
      fs.copyFile(
        path.join(entrypointDir, entrypoint),
        path.join(distDir, `${entrypointBase}.d.ts`),
      ),
    ]);
  }

  // check the dist directory and remove .d.d.ts files
  const distFiles = await fs.readdir(distDir);
  for (const distFile of distFiles) {
    if (
      distFile.endsWith(".d.d.ts") ||
      distFile.endsWith(".d.d.mts") ||
      distFile.endsWith(".d.js") ||
      distFile.endsWith(".d.mjs")
    ) {
      await fs.unlink(path.join(distDir, distFile));
    }
  }
};

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
