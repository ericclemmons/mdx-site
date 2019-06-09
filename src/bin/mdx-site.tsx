#!/usr/bin/env node

const fse = require("fs-extra");
const path = require("path");

const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

// Ensure a default tsconfig.json exists for transpiling
if (!fse.existsSync(tsconfigPath)) {
  fse.copySync(
    path.resolve(__dirname, "../../template/tsconfig.json"),
    tsconfigPath
  );
}

require("ts-node/register/type-check");
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
