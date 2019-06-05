// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
// @ts-ignore
import MDX from "@mdx-js/runtime";
import { readFileSync } from "fs";
import React from "react";

import { components } from "./components";

export const Navigation = () => {
  const mdx = readFileSync(`${__dirname}/../../content/about.mdx`, "utf8");

  return (
    <MDXProvider components={components}>
      <MDX>{mdx}</MDX>
    </MDXProvider>
  );
};
