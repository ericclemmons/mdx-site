import React from "react";

export default function blockquote(props: any) {
  return (
    <blockquote
      className="border-l-4 border-purple-600 italic pl-6 my-4 whitespace-pre-line"
      style={{
        background:
          "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))"
      }}
      {...props}
    />
  );
}
