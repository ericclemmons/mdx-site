import escapeStringRegexp from "escape-string-regexp";
import fse from "fs-extra";
import path from "path";

import { defaultPublicDir } from "./defaults";

interface Variables {
  [key: string]: string;
}

const templatePath = path.join(defaultPublicDir, "index.html");

export default async function renderTemplate(variables: Variables = {}) {
  const template = await fse.readFile(templatePath, "utf8");

  return Object.entries(variables).reduce((acc, [replacement, value]) => {
    return acc.replace(
      new RegExp(`%${escapeStringRegexp(replacement.toUpperCase())}%`, "g"),
      value
    );
  }, template);
}
