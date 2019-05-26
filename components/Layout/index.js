import Head from "next/head";

export const Layout = ({ children }) => (
  <div className="antialiased bg-gray-100 font-serif">
    <Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@1.0.1/dist/tailwind.min.css"
      />
      <style>
        {`
          body { height: 100vh; min-height: 100vh; }
        `}
      </style>
    </Head>

    <div
      className="overflow-y-scroll h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: `
        [fullbleed-start] minmax(1.2rem, 1fr)
        [content-start] minmax(auto, 1024px)
        [content-end] minmax(1.2rem, 1fr)
        [fullbleed-end]
      `
      }}
    >
      <div
        className="flex"
        style={{
          gridArea: "1 / fullbleed-start / -1 / fullbleed-end",
          display: "grid",
          backgroundImage:
            "linear-gradient(to right, #805ad5 50%, transparent 50%"
        }}
      />
      <div
        className="flex"
        style={{
          gridArea: "1 / content-start / -1 / content-end"
        }}
      >
        <div className="w-64 bg-purple-600 text-gray-100">
          <nav className="sticky overflow-y-auto h-screen top-0">
            <div className="p-8">
              <img
                className="rounded-full w-full border-4 shadow-md mb-4"
                src="https://github.com/ericclemmons.png"
              />
            </div>
          </nav>
        </div>

        <main
          className="bg-gray-100 flex-1"
          style={{ boxShadow: "-3px 0 4px rgba(0, 0, 0, 0.12)" }}
        >
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  </div>
);
