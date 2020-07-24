import React from "react";
import { useStore } from "../store/store";
import { queryByPostId } from "../graphql/query";
import { PagePost } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import { Divider, Hidden } from "@material-ui/core";
import HeaderPost from "./HeaderPost";
import SuggestionEdit from "./SuggestionEdit";
import NoticeEdit from "./NoticeEdit";
import VoteEdit from "./VoteEdit";
import Forbidden from "./Forbidden";
import EventEdit from "./EventEdit";

export default function RoutePostEdit() {
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const { data, error, loading } = useQuery<PagePost>(queryByPostId, {
    variables: { post_id, user_id, isAnonymous: !user_id },
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
  let postByType = null;
  switch (p?.board?.type) {
    case "notice":
      postByType = <NoticeEdit post={p} />;
      break;
    case "vote":
      postByType = <VoteEdit post={p} />;
      break;
    case "suggestion":
      postByType = <SuggestionEdit post={p} />;
      break;
    case "event":
      postByType = <EventEdit post={p} />;
      break;
    default:
      postByType = <SuggestionDetail post={p} />;
  }
  return (
    <>
      <Hidden mdUp>
        <HeaderPost post={p} />
      </Hidden>
      <Divider />
      {postByType}
    </>
  );
}
