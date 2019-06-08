// @ts-ignore
import findAllPages from "../src/utils/findAllPages";
import { defaultContentDir } from "../src/utils/defaults";
import getMDX from "../src/utils/getMDX";

export const posts = async () => {
  const pages = (await findAllPages(defaultContentDir)).filter(page =>
    page.includes("/blog/")
  );

  const mdxs = await Promise.all(pages.map(page => getMDX(page)));

  mdxs.sort((a, b) => {
    return b.attributes.firstPublishedAt - a.attributes.firstPublishedAt;
  });

  return mdxs;
};
