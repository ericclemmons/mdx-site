import { defaults, findAllPages, getMDX } from "../../";

const { defaultContentDir } = defaults;

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
