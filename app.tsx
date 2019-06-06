// @ts-ignore
import MDX from "@mdx-js/runtime";
import { send } from "micro";
import { router, get } from "microrouter";
// @ts-ignore
import serve from "serve-handler";

import fs from "fs";
import { ServerResponse, IncomingMessage } from "http";
import { promisify } from "util";
import fm from "front-matter";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Layout as DefaultLayout } from "./components/Layout";

const readFile = promisify(fs.readFile);

const resolve = (...segments: any) => {
  try {
    return require.resolve(path.join(process.cwd(), ...segments));
  } catch (error) {
    return null;
  }
};

const getMDX = async (folder: string) => {
  const mdxPath = resolve("content", folder, "index.mdx");

  if (!mdxPath) {
    return;
  }

  return await readFile(mdxPath, "utf8");
};

const getExports = async (folder: string, req: IncomingMessage) => {
  const exportsPath = resolve("content", folder);

  if (!exportsPath) {
    return {
      default: DefaultLayout
    };
  }

  const { default: Layout = DefaultLayout, ...exports } = await import(
    exportsPath
  );

  const keys = Object.keys(exports);
  const values = await Promise.all(
    Object.entries(exports).map(([prop, value]) => {
      // Return layout as-is
      if (prop === "default") {
        return value;
      }

      if (typeof value === "function") {
        return value(req);
      }

      // Enforce all exports being functions, otherwise we won't be able
      // to differentiate a Component from a resolver.
      throw new Error(
        `${exportsPath}'s ${JSON.stringify(prop)} should be a Function`
      );
    })
  );

  const scope = keys.reduce((acc, key, i) => {
    return {
      ...acc,
      [key]: values[i]
    };
  }, {});

  return { default: Layout, ...scope };
};

export default router(
  get("(:folder)", async (req, res) => {
    const { ext } = path.parse(req.url as string);

    // Ignore potentially static files
    if (ext) {
      return;
    }

    const { folder = "/" } = req.params;
    const [mdx, exports] = await Promise.all([
      getMDX(folder),
      getExports(folder, req)
    ]);

    // Ignore folders without markup
    if (!mdx) {
      return;
    }

    const { attributes, body } = fm(mdx);
    const { default: Layout = DefaultLayout, ...scope } = exports;
    const { title } = attributes;

    const markup = renderToStaticMarkup(
      <Layout>
        <MDX scope={scope}>{title ? `# ${title}\n${body}` : body}</MDX>
      </Layout>
    );

    return `
      <!doctype html>

      <meta charset="utf-8">
      <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@1.0.1/dist/tailwind.min.css"
      />

      <style>
        body {
          /* https://www.svgbackgrounds.com/#subtle-prism */
          background-color: #805ad5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(360,640,383)'%3E%3Cstop offset='0' stop-color='%23805ad5'/%3E%3Cstop offset='1' stop-color='%234FE'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
          background-attachment: fixed;
          background-size: cover;
        }

        twitter-widget {
          margin-left: auto;
          margin-right: auto;
        }
      </style>

      ${markup}

      <script src="https://unpkg.com/quicklink@1.0.0/dist/quicklink.umd.js"></script>
    `;
  }),

  get("/*", async (req, res) => {
    await serve(
      req,
      res,
      {
        directoryListing: false,
        public: "public",
        renderSingle: true
      },
      {
        sendError(
          absolutePath: string,
          response: ServerResponse,
          acceptsJSON: boolean,
          root: string,
          handlers: any,
          config: any,
          error: {
            statusCode: number;
            code: string;
            message: string;
          }
        ) {
          const { statusCode, message } = error;

          send(res, statusCode, message);
        }
      }
    );
  })
);
