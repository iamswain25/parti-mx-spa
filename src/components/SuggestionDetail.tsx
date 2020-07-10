import React from "react";
import { Post } from "../types";

export default function SuggestionDetail({ post: p }: { post?: Post }) {
  const { title, metadata, context, body, images, comments } = p ?? {};
  return (
    <>
      <h1>{title}</h1>
      <div>{JSON.stringify(metadata)}</div>
      <div>{context}</div>
      <div>{body}</div>
      {images?.map((image, i) => {
        return (
          <div key={i}>
            <img src={image.uri} alt="post" />
          </div>
        );
      })}
      {comments?.map((c, i) => {
        return <div key={i}>{c.body}</div>;
      })}
    </>
  );
}
