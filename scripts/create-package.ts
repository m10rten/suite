/* eslint-disable no-console */
// it should take in a package name and create a new package in the packages folder
// it should create a new folder with the package name, then copy the template files into it from packages/_template
// it should then update the package.json with the new package name

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

const args = process.argv.slice(2);
const packageName = args[0];
const shouldInternal = args[1] === "true";
if (!packageName) {
  console.log("Please specify a package name");
  process.exit(1);
}

const packagePath = shouldInternal
  ? path.join(process.cwd(), "packages", "internal", packageName)
  : path.join(process.cwd(), "packages", packageName);
const templatePath = path.join(process.cwd(), "packages", "internal", "_template");
const packageJsonPath = path.join(packagePath, "package.json");

// first check if the package already exists and exit if it does
if (fs.existsSync(packagePath)) {
  console.log(`Package ${packageName} already exists`);
  process.exit(1);
}

// create the package folder from a copy
fs.mkdirSync(packagePath);
fs.cpSync(templatePath, packagePath, { recursive: true });

// update the package.json with the new package name
const newName = `@mvdlei/${packageName}`;
const schema = z.object({
  name: z.string(),
  private: z.boolean().optional(),
  publishConfig: z
    .object({
      access: z.string(),
    })
    .optional(),
});
const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const packageJson = schema.parse(packageJsonContent);
packageJson.name = newName;
if (shouldInternal) {
  packageJson.private = true;
  packageJson.publishConfig = {
    access: "public",
  };
} else {
  delete packageJson.private;
  delete packageJson.publishConfig;
}

// write the new package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

execSync(`pnpm format`);

console.log(`Created package ${newName} in ${packagePath}`);
