import Link from "next/link";

export const components = {
  a(props) {
    const { href } = props;
    const link = (
      <a className="text-purple-600 hover:text-purple-900" {...props} />
    );

    if (href) {
      return (
        <Link href={href} prefetch>
          {link}
        </Link>
      );
    }

    return link;
  },

  blockquote(props) {
    return (
      <blockquote
        class="bg-white border-l-4 border-purple-600 italic pl-6 my-4 whitespace-pre-line"
        {...props}
      />
    );
  },

  code(props) {
    return <code class="font-mono bg-white border shadow-sm" {...props} />;
  },

  h1(props) {
    return <h1 class="mb-8 text-5xl" {...props} />;
  },

  h3(props) {
    return (
      <h3
        class="italic mx-auto my-16 opacity-75 text-3xl w-5/6 text-center"
        {...props}
      />
    );
  },

  h4(props) {
    return <h4 class="font-semibold mt-8 text-2xl" {...props} />;
  },

  hr(props) {
    return <hr className="border my-4 border-dashed" {...props} />;
  },

  img(props) {
    return (
      <img
        className="border-4 border-white mx-auto my-4 rounded-lg shadow-md w-5/6"
        {...props}
      />
    );
  },

  ol(props) {
    return <ol class="list-decimal ml-4" {...props} />;
  },

  p(props) {
    return <p class="text-lg py-2" {...props} />;
  },

  strong(props) {
    return <strong class="font-semibold" {...props} />;
  },

  ul(props) {
    return <ul class="list-disc ml-4" {...props} />;
  }
};
