#!/usr/bin/env node

import fse from "fs-extra";
import path from "path";

import {
  defaultComponentsDir,
  defaultContentDir,
  defaultPublicDir,
  templateComponentsDir,
  templateContentDir,
  templatePublicDir
} from "../utils/defaults";

const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

// Ensure a default tsconfig.json exists for transpiling
if (!fse.existsSync(tsconfigPath)) {
  fse.copySync(
    path.resolve(__dirname, "../../template/tsconfig.json"),
    tsconfigPath
  );
}

// Copy /content, if missing
if (!fse.existsSync(defaultContentDir)) {
  fse.copySync(templateContentDir, defaultContentDir, {
    preserveTimestamps: true
  });

  // ...and copy /components, if missing
  if (!fse.existsSync(defaultComponentsDir)) {
    fse.copySync(templateComponentsDir, defaultComponentsDir, {
      preserveTimestamps: true
    });
  }
}

// Copy /public, if missing
if (!fse.existsSync(defaultPublicDir)) {
  fse.copySync(templatePublicDir, defaultPublicDir, {
    overwrite: false,
    preserveTimestamps: true
  });
}

if (!require.extensions[".ts"]) {
  require("ts-node/register/type-check");
}

console.info("⚙️   ts-node registered");

const [, , command = "start"] = process.argv;

switch (command) {
  case "build":
    require("../build");
    break;
  case "start":
    require("../server");
    break;
  default:
    throw new Error(
      `mdx-site does not support the command ${JSON.stringify(command)}`
    );
}
