const withMdxFm = require("next-mdx-frontmatter")();

module.exports = withMdxFm({
  pageExtensions: ["js", "mdx"]
});
