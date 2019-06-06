// @ts-ignore
import MDX from "@mdx-js/runtime";
import fm from "front-matter";
import fse from "fs-extra";
import globby from "globby";
import React from "react";
import path from "path";
import { promisify } from "util";

const contentPath = path.join(process.cwd(), "content");

export const posts = async () => {
  const files = await globby(`${contentPath}/blog/**/index.mdx`, {
    absolute: true
  });

  const mdxs = await Promise.all(files.map(file => fse.readFile(file, "utf8")));
  const posts = mdxs
    .map((mdx, i) => {
      const href = files[i].replace(contentPath, "").replace("/index.mdx", "");
      const { attributes, body } = fm(mdx);

      // Break at the first heading or line-break
      const breaks = [body.indexOf("---"), body.indexOf("# ")].filter(
        i => i !== -1
      );

      const snippet = body.slice(0, Math.min(...breaks)).trim();

      return {
        ...attributes,
        body: <MDX>{body}</MDX>,
        href,
        snippet: <MDX>{snippet}</MDX>
      };
    })
    .sort((a, b) => {
      return b.firstPublishedAt - a.firstPublishedAt;
    });

  return posts;
};
