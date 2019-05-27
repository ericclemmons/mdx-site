import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

import About from "./about.mdx";
import { components } from "./components";

export const Navigation = () => (
  <MDXProvider components={components}>
    <About />
  </MDXProvider>
);
