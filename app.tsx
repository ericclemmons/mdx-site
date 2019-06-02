import React from "react";
import { renderToString } from "react-dom/server";

export default async () => {
  return renderToString(<h1>Howdy there!</h1>);
};
