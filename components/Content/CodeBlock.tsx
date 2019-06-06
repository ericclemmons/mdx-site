import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";

export default function CodeBlock({
  children,
  className = "language-jsx"
}: any) {
  const language = className.replace(/language-/, "");

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
        <pre
          className={`${className} shadow-inner overflow-auto`}
          style={{ ...style, padding: "20px" }}
        >
          {tokens.map((line: string[], i: number) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token: string, key: number) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
