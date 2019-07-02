// @ts-ignore
import MDX from "@mdx-js/runtime";
import fm from "front-matter";
import fse from "fs-extra";
import React from "react";

import { defaultContentDir } from "./defaults";
import resolvePageProps from "./resolvePageProps";

export default async function getMDX(pagePath: string) {
  const [raw, props] = await Promise.all([
    fse.readFile(pagePath, "utf8"),
    resolvePageProps(pagePath)
  ]);

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

  return { attributes, body, Body, href, props, raw, snippet, Snippet };
}
