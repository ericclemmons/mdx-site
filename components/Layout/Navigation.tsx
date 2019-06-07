import React from "react";
// @ts-ignore
import { SocialIcon } from "react-social-icons";

import P from "../p";

const Mark = (props: any) => {
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
};

export const Navigation = () => {
  return (
    <React.Fragment>
      <a href="/">
        <img
          alt="Picture of Eric Clemmons"
          className="rounded-full border-4 shadow-md mb-4 w-56 h-56 mx-auto"
          src="/eric.jpg"
        />
      </a>

      <P>
        Hi, I'm <Mark>Eric Clemmons</Mark>.
      </P>

      {/*
        I create better user & developer experiences through open-source software, metrics-driven experiments, and reducing friction.
      */}

      <P>
        I specialize in building <Mark>remote teams</Mark> & developing{" "}
        <Mark>full-stack applications</Mark> with technologies such as
        TypeScript, React, & GraphQL that enable metrics-driven{" "}
        <Mark>experimentation</Mark>.
      </P>

      <p className="flex justify-around mt-4 font-sans text-gray-700">
        <button className="bg-white rounded-full shadow hover:shadow-md border-2 border-white hover:border-yellow-200">
          <SocialIcon
            bgColor="#44337a"
            fgColor="white"
            style={{ width: "2rem", height: "2rem" }}
            url="mailto:eric@clemmons.family?subject=I was on your website..."
          />
          <label className="hidden sm:inline md:hidden px-2">
            eric@clemmons.family
          </label>
        </button>

        <button className="bg-white rounded-full shadow hover:shadow-md border-2 border-white hover:border-yellow-200">
          <SocialIcon
            fgColor="white"
            style={{ width: "2rem", height: "2rem" }}
            url="https://twitter.com/ericclemmons"
          />
          <label className="hidden sm:inline md:hidden px-2">
            @ericclemmons
          </label>
        </button>

        <button className="bg-white rounded-full shadow hover:shadow-md border-2 border-white hover:border-yellow-200">
          <SocialIcon
            bgColor="black"
            fgColor="white"
            style={{ width: "2rem", height: "2rem" }}
            url="https://github.com/ericclemmons"
          />
          <label className="hidden px-2">ericclemmons</label>
        </button>

        <button className="bg-white rounded-full shadow hover:shadow-md border-2 border-white hover:border-yellow-200">
          <SocialIcon
            fgColor="white"
            url="https://linkedin.com/in/ericclemmons"
            style={{ width: "2rem", height: "2rem" }}
          />
          <label className="hidden px-2">ericclemmons</label>
        </button>
      </p>
    </React.Fragment>
  );
};
