// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
// @ts-ignore
import MDX from "@mdx-js/runtime";
import { readFileSync } from "fs";
import React from "react";

import { components } from "./components";

const mdx = readFileSync(`${__dirname}/../../content/about.mdx`, "utf8");

const About = () => <MDX>{mdx}</MDX>;

export const Navigation = () => (
  <MDXProvider components={components}>
    <About />
  </MDXProvider>
);
