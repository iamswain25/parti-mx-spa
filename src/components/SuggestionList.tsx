import React from "react";
import { useStore } from "../store/store";
import { subscribePostsByBoardId } from "../graphql/subscription";
import useNavigateToPost from "./useNavigateToPost";
import { PageBoard } from "../types";
import { useParams } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function SuggestionList() {
  const [{ user_id }] = useStore();
  const navigatePost = useNavigateToPost();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const { id = 104 } = useParams();
  const { data, error, loading = true } = useSubscription<PageBoard>(
    subscribePostsByBoardId,
    {
      variables: { id, user_id, isAnonymous: !user_id },
    }
  );
  React.useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);
  const { posts = [], title } = data?.mx_boards_by_pk ?? {};
  if (error) {
    console.log(error);
  }
  return (
    <>
      <h1>제안 - {title}</h1>
      {posts.map((p, i) => {
        return <div onClick={() => navigatePost(p.id)}>{p.body}</div>;
      })}
    </>
  );
}
