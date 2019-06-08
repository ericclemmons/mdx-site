#!/usr/bin/env node

try {
  require("ts-node/register");
  console.info("⚙️   ts-node registered");
} catch (error) {}

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
