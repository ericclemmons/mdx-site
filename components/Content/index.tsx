// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
import React from "react";

import { components } from "./components";

export const Content = (props: any) => (
  <MDXProvider {...props} components={components} />
);
