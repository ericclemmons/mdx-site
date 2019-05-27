import { MDXProvider } from "@mdx-js/react";
import App, { Container } from "next/app";
import Link from "next/link";
import React from "react";

import { Layout } from "../components/Layout";

const components = {
  a(props) {
    const { href } = props;
    const link = (
      <a className="text-purple-600 hover:text-purple-900" {...props} />
    );

    if (href) {
      return <Link href={href}>{link}</Link>;
    }

    return link;
  },

  blockquote(props) {
    return (
      <blockquote
        class="bg-white border-l-4 border-purple-600 italic pl-6 my-4 whitespace-pre-line"
        {...props}
      />
    );
  },

  code(props) {
    return <code class="font-mono bg-white border shadow-sm" {...props} />;
  },

  h1(props) {
    return <h1 class="mb-8 text-5xl" {...props} />;
  },

  h3(props) {
    return (
      <h3
        class="italic mx-auto my-16 opacity-75 text-3xl w-5/6 text-center"
        {...props}
      />
    );
  },

  h4(props) {
    return <h4 class="font-semibold mt-8 text-2xl" {...props} />;
  },

  h5(props) {
    return (
      <h4
        class="bg-purple-500 mt-8 text-lg border-l-4 font-semibold pl-4 py-1 mb-3 shadow-md sticky top-0 w-screen"
        {...props}
      />
    );
  },

  hr(props) {
    return <hr className="border my-4 border-dashed" {...props} />;
  },

  img(props) {
    return (
      <img
        className="border-4 border-white mx-auto my-4 rounded-lg shadow-md w-5/6"
        {...props}
      />
    );
  },

  ol(props) {
    return <ol class="list-decimal ml-6" {...props} />;
  },

  p(props) {
    return <p class="text-lg py-2" {...props} />;
  },

  strong(props) {
    return <strong class="font-semibold" {...props} />;
  },

  ul(props) {
    return <ul class="list-disc ml-6" {...props} />;
  }
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MDXProvider components={components}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </Container>
    );
  }
}
