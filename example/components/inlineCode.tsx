import React from "react";

export default function inlineCode(props: any) {
  return (
    <code
      className="p-1 rounded border-b-2 font-mono bg-white border shadow-sm"
      {...props}
    />
  );
}
