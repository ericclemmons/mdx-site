// @ts-ignore
import MDX from "@mdx-js/runtime";
import fm from "front-matter";
import fs from "fs";
import globby from "globby";
import React from "react";
import path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const contentPath = path.resolve(process.cwd(), "content");

export const posts = async () => {
  const files = await globby(`${contentPath}/blog/**/index.mdx`, {
    absolute: true
  });

  const mdxs = await Promise.all(files.map(file => readFile(file, "utf8")));
  const posts = mdxs.map((mdx, i) => {
    const href = files[i].replace(contentPath, "").replace("/index.mdx", "");
    const { attributes, body } = fm(mdx);
    const snippet = body.slice(0, Math.min(300, body.indexOf("---"))).trim();

    return {
      ...attributes,
      body: <MDX>{body}</MDX>,
      href,
      snippet: <MDX>{snippet}</MDX>
    };
  });

  return posts;
};
