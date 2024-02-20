/* eslint-disable no-console */
// it should take in a app name and create a new app in the apps folder
// it should create a new folder with the app name, then copy the template files into it from apps/internal/_template
// it should then update the package.json with the new package name

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

const args = process.argv.slice(2);
const appName = args[0];
const shouldInternal = args[1] === "true";
if (!appName) {
  console.log("Please specify a package name");
  process.exit(1);
}

const appPath = shouldInternal
  ? path.join(process.cwd(), "apps", "internal", appName)
  : path.join(process.cwd(), "apps", appName);
const templatePath = path.join(process.cwd(), "apps", "internal", "_template");
const packageJsonPath = path.join(appPath, "package.json");

// first check if the package already exists and exit if it does
if (fs.existsSync(appPath)) {
  console.log(`App ${appName} already exists`);
  process.exit(1);
}

// create the package folder from a copy
fs.mkdirSync(appPath);
fs.cpSync(templatePath, appPath, { recursive: true });

// update the package.json with the new package name
const newName = `${appName}`;
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

console.log(`Created package ${newName} in ${appPath}`);
