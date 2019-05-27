import { MDXProvider } from "@mdx-js/react";

import { components } from "./components";

export const Content = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
