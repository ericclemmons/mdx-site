import path from "path";
import React from "react";

const cwd = process.cwd().replace(/\\/g, "/");
const resolve = path.posix.resolve;

const root = resolve(__dirname, "../../");
const join = path.posix.join;

export const DefaultLayout = (props: any) => <React.Fragment {...props} />;

export const defaultComponentsDir = join(cwd, "components");
export const defaultContentDir = join(cwd, "content");
export const defaultOutputDir = join(cwd, "dist");
export const defaultPublicDir = join(cwd, "public");

export const templateDir = resolve(root, "template");
export const templateComponentsDir = resolve(templateDir, "components");
export const templateContentDir = resolve(templateDir, "content");
export const templatePublicDir = resolve(templateDir, "public");

// TODO How to configure title? `react-helmet`?
export const defaultTitle = "Eric Clemmons";
