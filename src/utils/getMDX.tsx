// @ts-ignore
import MDX from "@mdx-js/runtime";
import fm from "front-matter";
import fse from "fs-extra";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { defaultContentDir } from "./defaults";

export default async function getMDX(pagePath: string) {
  const raw = await fse.readFile(pagePath, "utf8");
  const { attributes, body } = fm(raw);
  const href = pagePath
    .replace(defaultContentDir, "")
    .replace("/index.mdx", "");

  // Break at the first heading or line-break
  const breaks = [body.indexOf("---"), body.indexOf("# ")].filter(
    i => i !== -1
  );

  const snippet = body.slice(0, Math.min(...breaks)).trim();
  const Body = () => <MDX>{body}</MDX>;
  const Snippet = () => <MDX>{snippet}</MDX>;

  return { attributes, body, Body, href, raw, snippet, Snippet };
}
