// @ts-ignore
import MDX from "@mdx-js/runtime";
import escapeStringRegexp from "escape-string-regexp";
import { minify } from "html-minifier";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { DefaultLayout, defaultTemplate, defaultTitle } from "./defaults";

interface MDX {
  readonly attributes: any;
  readonly body: string;
  readonly frontmatter?: string;
  readonly raw: string;
}

export default async function renderMDX(mdx: MDX, props: any) {
  const { attributes, body } = mdx;
  const { title } = attributes;
  const { default: Layout = DefaultLayout, ...scope } = props;

  const markup = renderToStaticMarkup(
    <Layout>
      <MDX scope={scope}>{title ? `# ${title}\n${body}` : body}</MDX>
    </Layout>
  );

  const {
    description = renderToStaticMarkup(<MDX>{body}</MDX>)
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\n/g, " ")
      .slice(0, 150)
      .concat("...")
  } = attributes;

  const html = Object.entries({
    title: title || defaultTitle,
    description,
    markup
  }).reduce((acc, [replacement, value]) => {
    return acc.replace(
      new RegExp(`%${escapeStringRegexp(replacement.toUpperCase())}%`, "g"),
      value
    );
  }, defaultTemplate);

  if (process.env.NODE_ENV !== "production") {
    return html;
  }

  // TODO Disable in development
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
