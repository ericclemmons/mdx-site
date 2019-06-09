import path from "path";
import React from "react";

const cwd = process.cwd();
const root = path.resolve(__dirname, "../../");

export const DefaultLayout = (props: any) => <React.Fragment {...props} />;

export const defaultComponentsDir = path.join(cwd, "components");
export const defaultContentDir = path.join(cwd, "content");
export const defaultOutputDir = path.join(cwd, "dist");
export const defaultPublicDir = path.join(cwd, "public");

export const templateDir = path.resolve(root, "template");
export const templateContentDir = path.resolve(templateDir, "content");
export const templatePublicDir = path.resolve(templateDir, "public");

// TODO How to configure title? `react-helmet`?
export const defaultTitle = "Eric Clemmons";
