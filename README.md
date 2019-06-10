<h1 align="center">
  <img alt="mdx" height="40" src="https://raw.githubusercontent.com/mdx-js/design/master/assets/logo.svg?sanitize=true" />
  <sup>&nbsp;S I T E</sup>
</h1>

Static site generator powered by:

- `ʦ` [TypeScript][ts]
- `↓` [MDX][mdx]
- `⚛`️ [React][react]
- `♻` [hot-module-replacement][hmr]

![lighthouse score](lighthouse.png)

## Getting Started

If you're starting from scratch:

1. `mkdir my-site`
1. `cd my-site`

Within your project, install `mdx-site`:

1. `yarn add mdx-site`

Now you're ready to run it:

1. `yarn mdx-site`
1. Visit <http://localhost:3000/>.

## Authoring

1. Add pages to `content/:page/index.mdx`

1. `export` data via `content/:page/index.tsx`

1. Customize HTML template: `public/index.html`

1. Customize components: `components/:tag.tsx`

1. 🚀 Publish to `dist`:

   `yarn mdx-site build`

**All changes are [hot-reloaded][hmr]**. Refresh for changes!

## Deployment

1. `yarn mdx-site build`
1. Publish `dist` as a static site using Netlify, Now, or whatever you'd like.

## Author

- [Eric Clemmons](ericclemmons.com)

[hmr]: https://github.com/sidorares/hot-module-replacement
[mdx]: https://mdxjs.com/
[now]: https://zeit.co/now
[react]: https://reactjs.org/
[site]: https://ericclemmons.com/
[ts]: https://www.typescriptlang.org/
