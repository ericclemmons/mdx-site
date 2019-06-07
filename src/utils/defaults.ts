import fs from "fs";
import path from "path";

export const defaultContentDir = path.resolve("content");
export const defaultOutputDir = path.resolve("dist");
export const defaultPublicDir = path.resolve("public");
export const defaultTemplate = fs.readFileSync("./public/index.html", "utf8");
export const defaultTitle = "Eric Clemmons";
