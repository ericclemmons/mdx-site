import path from "path";
import { ReactElement } from "react";

interface Props {
  default?: ReactElement;
  [key: string]: any;
}

// Graceful resolve
const resolve = (...segments: string[]) => {
  try {
    return require.resolve(path.join(...segments));
  } catch (error) {
    return null;
  }
};

export default async function resolveProps(contentDir: string, folder = "/") {
  const propsFile = resolve(contentDir, folder);

  if (!propsFile) {
    return {};
  }

  const { default: Layout, ...exported } = await import(propsFile);

  const keys = Object.keys(exported);
  const values = await Promise.all(
    Object.entries(exported).map(([prop, value]) => {
      // Return layout as-is
      if (prop === "default") {
        return value;
      }

      if (typeof value === "function") {
        return value();
        // TODO Are there any values to supply for resolution?
      }

      // Enforce all exports being functions, otherwise we won't be able
      // to differentiate a Component from a resolver.
      throw new Error(
        `${propsFile}'s ${JSON.stringify(prop)} should be a Function`
      );
    })
  );

  const props: Props = keys.reduce((acc, key, i) => {
    return {
      ...acc,
      [key]: values[i]
    };
  }, {});

  // Combine layout with resolved props
  if (Layout) {
    props.default = Layout;
  }

  return props;
}
