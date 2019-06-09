#!/usr/bin/env node

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
