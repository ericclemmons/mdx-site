import React from "react";

export default function h2(props: any) {
  return (
    <h2
      className="border-b -ml-8 pl-8 text-4xl tracking-wide my-8"
      style={{
        background:
          "linear-gradient(to right, white 85%, rgba(255, 255, 255, 0))",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)"
      }}
      {...props}
    />
  );
}
