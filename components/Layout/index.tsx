import React from "react";
import { Content } from "../Content";
import { Navigation } from "../Navigation";
import { ResponsiveBadge } from "../ResponsiveBadge";

export const Layout = (props: any) => (
  <div className="antialiased font-serif text-gray-800">
    {process.env.NODE_ENV === "development" && <ResponsiveBadge />}

    <div className="hidden md:block bg-gray-100 w-1/2 h-screen fixed right-0 z-0" />

    <div className="md:flex mx-auto z-10 relative md:max-w-4xl">
      <div className="md:w-64">
        <nav
          className="md:fixed md:w-64 p-8 md:p-4 text-white max-h-screen overflow-y-auto"
          style={{
            textShadow: "0 1px 1px rgba(0, 0, 0, 0.25)"
          }}
        >
          <Navigation />
        </nav>
      </div>

      <main
        className="bg-gray-100 flex-1 p-8 pt-0 min-h-screen md:max-w-2xl overflow-x-auto"
        style={{ boxShadow: "-3px 0 4px rgba(0, 0, 0, 0.12)" }}
      >
        <Content {...props} />
      </main>
    </div>
  </div>
);
