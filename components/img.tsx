import React from "react";

export default function img(props: any) {
  return (
    <img
      className="border-4 border-white mx-auto my-4 rounded-lg shadow-md w-5/6"
      {...props}
    />
  );
}
