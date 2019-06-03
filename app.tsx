// @ts-ignore
import MDX from "@mdx-js/runtime";
import { readFileSync } from "fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const mdx = readFileSync("./content/javascript-fatigue.mdx", "utf8");

import { Layout } from "./components/Layout";

export default async () => {
  const html = renderToStaticMarkup(
    <Layout>
      <MDX>{mdx}</MDX>
    </Layout>
  );

  return `<!doctype html><meta charset="utf-8">${html}`;
};
