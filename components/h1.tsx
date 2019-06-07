import React from "react";

export default function h1(props: any) {
  return (
    <h1
      className="border-b -ml-8 pl-8 mb-8 text-5xl tracking-wide"
      style={{
        background:
          "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)"
      }}
      {...props}
    />
  );
}
