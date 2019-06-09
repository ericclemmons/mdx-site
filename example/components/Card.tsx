import React from "react";

export default function Card({ cta, href, children, title }: any) {
  return (
    /*
  @TODO Client-side bundle to enable an outline

  <div
    className="rounded-lg cursor-pointer hover:shadow-outline"
    onClick={() => {
      window.location.href = href;
    }}
  >
  */
    <section className="bg-white shadow-md overflow-hidden rounded-lg mb-8">
      {title && (
        <header className="relative">
          <a
            className="block text-white hover:text-yellow-200 bg-purple-600 tracking-wide px-4 py-2 text-xl"
            href={href}
          >
            {title}
          </a>
        </header>
      )}

      <main className="px-4 py-1 text-gray-700 text-base">{children}</main>

      {cta && (
        <footer>
          <a
            className="px-4 py-1 float-right rounded-full bg-gray-200 mr-4 mb-4 hover:bg-gray-300"
            href={href}
          >
            {cta}
          </a>
        </footer>
      )}
    </section>
  );
}
