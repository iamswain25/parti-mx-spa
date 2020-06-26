import React from "react";
import { useStore } from "../store/store";
import * as subs from "../graphql/subscription";
import * as subsAnon from "../graphql/subscriptionAnonymous";
import { SuggestionPost } from "../types";
import { useParams } from "react-router-dom";
import { useSubscription } from "@apollo/client";

export default function SuggestionDetail() {
  const [{ user_id }, dispatch] = useStore();
  const { id = 214 } = useParams();
  const { data, error, loading } = useSubscription<SuggestionPost>(
    user_id === null ? subsAnon.subscribeSuggestion : subs.subscribeSuggestion,
    {
      variables: user_id === null ? { id } : { id, user_id },
    }
  );
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading, dispatch]);
  const { title, body, context, metadata } = data?.mx_posts_by_pk ?? {};
  if (error) {
    console.log(error);
  }
  return (
    <>
      <h1>{title}</h1>
      <div>{JSON.stringify(metadata)}</div>
      <div>{context}</div>
      <div>{body}</div>
    </>
  );
}
