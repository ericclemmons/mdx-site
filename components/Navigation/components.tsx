import React from "react";
import { components as contentComponents } from "../Content/components";

const Link = (props: any) => <React.Fragment {...props} />;

export const components = {
  ...contentComponents,

  a(props: any) {
    return (
      <a
        className="cursor-pointer font-semibold text-yellow-400 hover:text-yellow-200"
        {...props}
      />
    );
  },

  h5(props: any) {
    return (
      <h4
        className="bg-purple-500 mt-8 text-lg border-l-4 font-semibold pl-4 py-1 mb-3 shadow-md sticky top-0 w-screen"
        {...props}
      />
    );
  },

  strong(props: any) {
    return (
      <strong
        className="text-black px-1 py-px"
        style={{
          backgroundColor: "#fff2ac",
          backgroundImage:
            "linear-gradient(-100deg, rgba(255,250,150,0.15), rgba(255,250,150,0.8) 100%, rgba(255,250,150,0.25))",
          textShadow: "none"
        }}
        {...props}
      />
    );
  },

  ul(props: any) {
    return <ul {...props} />;
  }
};
