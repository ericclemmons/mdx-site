#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

require("hot-module-replacement")({
  ignore: /node_modules/
});

import micro, { send } from "micro";

if (module.hot) {
  console.info("🔥  HMR Enabled");
  module.hot.accept("./app", () => {
    console.info("♻️  Reloaded");
  });
} else {
  console.info("💤  HMR Disabled");
}

micro((req, res) => {
  return require("./app")
    .default(req, res)
    .catch((error: Error) => {
      console.error(error);
      send(res, 500, error.message);
    });
}).listen(3000, () => {
  console.log(`🚀  Listening on http://localhost:3000/`);
});
