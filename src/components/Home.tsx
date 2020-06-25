import React from "react";
import { useStore } from "../store/store";
import * as subs from "../graphql/subscription";
import * as subsAnon from "../graphql/subscriptionAnonymous";
import useNavigateToPost from "./useNavigateToPost";
import { BoardList } from "../types";
import { useParams } from "react-router-dom";
import { useSubscription } from "@apollo/client";

export default function Home() {
  const [{ user_id }, dispatch] = useStore();
  const navigatePost = useNavigateToPost();
  const { id = 104 } = useParams();
  const { data, error, loading } = useSubscription<BoardList>(
    user_id === null
      ? subsAnon.subscribePostsByBoardId
      : subs.subscribePostsByBoardId,
    {
      variables: user_id === null ? { id } : { id, user_id },
    }
  );
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading, dispatch]);
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
