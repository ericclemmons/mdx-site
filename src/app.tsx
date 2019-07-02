import { ServerResponse } from "http";
import { send } from "micro";
import { router, get } from "microrouter";
import path from "path";
// @ts-ignore
import serve from "serve-handler";

import { defaultContentDir } from "./utils/defaults";
import getPage from "./utils/getPage";
import renderPage from "./utils/renderPage";

export default router(
  get("(:folder)", async req => {
    const { ext } = path.parse(req.url as string);

    // Ignore potentially static files
    if (ext) {
      return;
    }

    const { folder } = req.params;
    const page = await getPage(
      path.join(defaultContentDir, folder, "index.mdx")
    );

    // Ignore folders without markup
    if (!page) {
      return;
    }

    return renderPage(page);
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
          _absolutePath: string,
          _response: ServerResponse,
          _acceptsJSON: boolean,
          _root: string,
          _handlers: any,
          _config: any,
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
