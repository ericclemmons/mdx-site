import React from "react";

export default function wrapper(props: any) {
  const { children } = props;

  return (
    <React.Fragment>
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <section className="antialiased bg-gray-200 font-sans min-h-screen py-4">
        <main className="bg-white max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg">
          {children}
        </main>
      </section>
    </React.Fragment>
  );
}
