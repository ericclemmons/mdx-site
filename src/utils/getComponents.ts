import globby from "globby";
import path from "path";
import { ReactElement } from "react";

interface Components {
  [key: string]: ReactElement;
}

export default async function getComponents(componentsDir: string) {
  const componentFiles = await globby(componentsDir, {
    onlyFiles: false
  });

  const componentEntries = await Promise.all(
    componentFiles.map(async file => {
      const { name } = path.parse(file);
      const { default: component } = await import(file);

      return [name, component];
    })
  );

  const components = componentEntries.reduce(
    (acc: Components, [name, component]) => {
      return {
        ...acc,
        [name]: component
      };
    },
    {}
  );

  return components;
}
