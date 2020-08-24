import React from "react";
import L from "react-linkify";

function aTag(decoratedHref: string, decoratedText: string, key: number) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={decoratedHref}
      key={key}
      style={{ textDecoration: "underline" }}
    >
      {decoratedText}
    </a>
  );
}
export default function Linkify({ body }: { body: string }) {
  return <L componentDecorator={aTag}>{body}</L>;
}
