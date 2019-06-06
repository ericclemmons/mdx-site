import fs from "fs";
import path from "path";
import React from "react";

export const defaultContentDir = path.resolve("content");
export const DefaultLayout = (props: any) => <React.Fragment {...props} />;
export const defaultOutputDir = path.resolve("dist");
export const defaultPublicDir = path.resolve("public");
export const defaultTemplate = fs.readFileSync("./public/index.html", "utf8");
