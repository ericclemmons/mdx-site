// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
// @ts-ignore
import MDX from "@mdx-js/runtime";
import { minify } from "html-minifier";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { defaultComponentsDir, DefaultLayout, defaultTitle } from "./defaults";

import getComponents from "./getComponents";
import renderTemplate from "./renderTemplate";

interface MDX {
  readonly attributes: any;
  readonly body: string;
  readonly frontmatter?: string;
  readonly raw: string;
}

export default async function renderMDX(mdx: MDX, props: any) {
  const { attributes, body } = mdx;
  const { title } = attributes;
  const components = await getComponents(defaultComponentsDir);

  // Prefer PageLayout => components.Layout => DefaultLayout
  // @ts-ignore
  const { Layout = DefaultLayout } = components;
  const { default: PageLayout = Layout, ...scope } = props;

  const markup = renderToStaticMarkup(
    <MDXProvider components={components}>
      <PageLayout>
        <MDX scope={scope}>{title ? `# ${title}\n${body}` : body}</MDX>
      </PageLayout>
    </MDXProvider>
  );

  const {
    description = renderToStaticMarkup(<MDX scope={scope}>{body}</MDX>)
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\n/g, " ")
      .slice(0, 150)
      .concat("...")
  } = attributes;

  const html = await renderTemplate({
    title: title || defaultTitle,
    description,
    markup
  });

  if (process.env.NODE_ENV !== "production") {
    return html;
  }

  const minified = minify(html, {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    caseSensitive: true
  });

  return minified;
}
