import Link from "next/link";
import { Children } from "react";

import { components as contentComponents } from "../Content/components";

export const components = {
  ...contentComponents,

  a(props) {
    const { className, href } = props;

    if (className === "social-icon") {
      return <a className="social-icon h-16" {...props} />;
    }

    const link = (
      <a
        class="cursor-pointer font-semibold text-yellow-400 hover:text-yellow-200"
        {...props}
      />
    );

    if (href) {
      return <Link href={href}>{link}</Link>;
    }

    return link;
  },

  h5(props) {
    return (
      <h4
        class="bg-purple-500 mt-8 text-lg border-l-4 font-semibold pl-4 py-1 mb-3 shadow-md sticky top-0 w-screen"
        {...props}
      />
    );
  },

  strong(props) {
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

  ul(props) {
    return <ul {...props} />;
  }
};
