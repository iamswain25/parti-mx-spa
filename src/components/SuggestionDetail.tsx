import React from "react";
import { useStore } from "../store/store";
import * as subs from "../graphql/subscription";
import { SuggestionPost } from "../types";
import { useParams } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";

export default function SuggestionDetail() {
  const [{ user_id }] = useStore();
  const { id = 214 } = useParams();
  const { data, error, loading } = useSubscription<SuggestionPost>(
    subs.subscribeSuggestion,
    {
      variables: { id, user_id, isAnonymous: !user_id },
    }
  );
  useLoadingEffect(loading);
  useErrorEffect(error);

  const { title, body, context, metadata, images, comments } =
    data?.mx_posts_by_pk ?? {};

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
