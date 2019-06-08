import path from "path";
import React from "react";

export const DefaultLayout = (props: any) => <React.Fragment {...props} />;
export const defaultComponentsDir = path.join(process.cwd(), "components");
export const defaultContentDir = path.join(process.cwd(), "content");
export const defaultOutputDir = path.join(process.cwd(), "dist");
export const defaultPublicDir = path.join(process.cwd(), "public");
export const templateContentDir = path.resolve(
  __dirname,
  "../template/content"
);
export const templatePublicDir = path.resolve(__dirname, "../template/public");

// TODO How to configure title? `react-helmet`?
export const defaultTitle = "Eric Clemmons";
