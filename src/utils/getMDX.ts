import fm from "front-matter";
import fse from "fs-extra";
import path from "path";
import { promisify } from "util";

export default async function getMDX(contentDir: string, folder = "/") {
  const pagePath = require.resolve(path.join(contentDir, folder, "index.mdx"));
  const raw = await fse.readFile(pagePath, "utf8");

  const { attributes, body } = fm(raw);

  return { attributes, body, raw };
}
