import globby from "globby";
import path from "path";

export default async function findAllPages(contentDir: string) {
  return globby(path.join(contentDir, "**/index.mdx"), {
    absolute: true
  });
}
