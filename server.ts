require("hot-module-replacement")({
  ignore: /node_modules/
});

import micro from "micro";

if (module.hot) {
  console.info("🔥  HMR Enabled");
  module.hot.accept("./app");
} else {
  console.info("💤  HMR Disabled");
}

micro((...args) => {
  return require("./app").default(...args);
}).listen(3000, () => {
  console.log(`🚀 Listening on http://localhost:3000/`);
});
