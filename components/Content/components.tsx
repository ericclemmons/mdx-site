import React from "react";
// @ts-ignore
import { SocialIcon } from "react-social-icons";

import { Card } from "./Card";

const Link = (props: any) => <React.Fragment {...props} />;

export const components = {
  a(props: any) {
    return <a className="text-purple-600 hover:text-purple-900" {...props} />;
  },

  blockquote(props: any) {
    return (
      <blockquote
        className="border-l-4 border-purple-600 italic pl-6 my-4 whitespace-pre-line"
        style={{
          background:
            "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))"
        }}
        {...props}
      />
    );
  },

  Card,

  inlineCode(props: any) {
    return (
      <code
        className="p-1 rounded border-b-2 font-mono bg-white border shadow-sm"
        {...props}
      />
    );
  },

  h1(props: any) {
    return (
      <h1
        className="border-b -ml-8 pl-8 mb-8 text-5xl tracking-wide"
        style={{
          background:
            "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)"
        }}
        {...props}
      />
    );
  },

  h2(props: any) {
    return (
      <h2
        className="border-b -ml-8 pl-8 text-4xl tracking-wide my-8"
        style={{
          background:
            "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)"
        }}
        {...props}
      />
    );
  },

  h3(props: any) {
    return (
      <h3
        className="italic mx-auto my-16 opacity-75 text-3xl w-5/6 text-center"
        {...props}
      />
    );
  },

  h4(props: any) {
    return <h4 className="font-semibold mt-8 text-2xl" {...props} />;
  },

  hr(props: any) {
    return <hr className="border my-4 border-dashed" {...props} />;
  },

  img(props: any) {
    return (
      <img
        className="border-4 border-white mx-auto my-4 rounded-lg shadow-md w-5/6"
        {...props}
      />
    );
  },

  ol(props: any) {
    return <ol className="list-decimal ml-4" {...props} />;
  },

  p(props: any) {
    return <p className="text-lg py-2" {...props} />;
  },

  SocialIcon,

  strong(props: any) {
    return <strong className="font-semibold" {...props} />;
  },

  ul(props: any) {
    return <ul className="list-disc ml-4" {...props} />;
  }
};
