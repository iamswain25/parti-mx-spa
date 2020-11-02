import React from "react";
import { useStore } from "../store/store";
import { subsByPostId } from "../graphql/subscription";
import { PagePost } from "../types";
import { useSubscription } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import Forbidden from "./Forbidden";
import EventDetail from "./EventDetail";

export default function RoutePost() {
  const { post_id } = useParams<{ post_id: string }>();
  const [{ user_id }, dispatch] = useStore();
  const { data, error, loading } = useSubscription<PagePost>(subsByPostId, {
    variables: { post_id, user_id, isAnonymous: !user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const p = data?.mx_posts_by_pk;
  const board_id = data?.mx_posts_by_pk?.board?.id;
  React.useEffect(() => {
    if (board_id) {
      dispatch({ type: "SET_BOARD", board_id: Number(board_id) });
    }
  }, [board_id, dispatch]);
  if (loading) {
    return null;
  }
  if (!p) {
    return <Forbidden />;
  }
  switch (p?.board?.type) {
    case "notice":
      return <NoticeDetail post={p} />;
    case "vote":
      return <VoteDetail post={p} />;
    case "suggestion":
      return <SuggestionDetail post={p} />;
    case "event":
      return <EventDetail post={p} />;
    default:
      return <SuggestionDetail post={p} />;
  }
}
