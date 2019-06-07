import fse from "fs-extra";
import ora, { Ora } from "ora";
import path from "path";

import {
  defaultContentDir,
  defaultOutputDir,
  defaultPublicDir
} from "./utils/defaults";

import renderMDX from "./utils/renderMDX";
import findAllPages from "./utils/findAllPages";
import getMDX from "./utils/getMDX";
import resolveProps from "./utils/resolveProps";

const relative = (file: string) => file.replace(process.cwd(), ".");
let spinner: Ora;

(async () => {
  // Clean /dist
  spinner = ora().start(`Cleaning ${relative(defaultOutputDir)}`);
  await fse.emptyDir(defaultOutputDir);
  spinner.succeed(`Cleaned ${relative(defaultOutputDir)}`);

  // Copy /public to /dist
  spinner = ora().start(
    `Copying ${relative(defaultPublicDir)} to ${relative(defaultOutputDir)}`
  );
  await fse.copy(defaultPublicDir, defaultOutputDir);
  spinner.succeed(
    `Copied ${relative(defaultPublicDir)} to ${relative(defaultOutputDir)}`
  );

  // Find all /content
  spinner = ora().start("Finding pages");
  const pages = await findAllPages(defaultContentDir);
  spinner.info(`Found ${pages.length} pages`);

  // Build each page into /dist
  for (const page of pages) {
    const folder = page
      .replace(defaultContentDir, "")
      .replace("/index.mdx", "");

    const target = path.join(defaultOutputDir, folder, "index.html");
    spinner = ora().start(`Building ${folder || "/"}`);

    const mdx = await getMDX(page);
    const props = await resolveProps(defaultContentDir, folder);
    const output = await renderMDX(mdx, props);

    await fse.mkdirp(path.dirname(target));
    await fse.writeFile(target, output, "utf8");

    spinner.succeed(
      `Built ${folder || "/"} => ${target.replace(process.cwd(), ".")}`
    );
  }
})().catch(error => {
  console.error(error);
  spinner.fail(error);
});
