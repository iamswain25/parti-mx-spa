import React from "react";
import { queryByPostId } from "../graphql/query";
import { PagePost } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import SuggestionEdit from "./SuggestionEdit";
import NoticeEdit from "./NoticeEdit";
import VoteEdit from "./VoteEdit";
import Forbidden from "./Forbidden";
import EventEdit from "./EventEdit";

export default function RoutePostEdit() {
  const { post_id } = useParams<{ post_id: string }>();
  const { data, error, loading } = useQuery<PagePost>(queryByPostId, {
    variables: { post_id },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const p = data?.mx_posts_by_pk;
  if (loading) {
    return null;
  }
  if (!p) {
    return <Forbidden />;
  }
  switch (p?.board?.type) {
    case "notice":
      return <NoticeEdit post={p} />;
    case "vote":
      return <VoteEdit post={p} />;
    case "suggestion":
      return <SuggestionEdit post={p} />;
    case "event":
      return <EventEdit post={p} />;
    default:
      return <SuggestionDetail post={p} />;
  }
}
