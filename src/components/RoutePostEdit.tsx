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
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import SuggestionEdit from "./SuggestionEdit";

export default function RoutePostEdit() {
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const { data, error, loading } = useQuery<PagePost>(queryByPostId, {
    variables: { post_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const p = data?.mx_posts_by_pk;
  if (!p) {
    return null;
  }
  let postByType = null;
  switch (p?.board?.type) {
    case "notice":
      postByType = <NoticeDetail post={p} />;
      break;
    case "vote":
      postByType = <VoteDetail post={p} />;
      break;
    case "suggestion":
      postByType = <SuggestionEdit post={p} />;
      break;
    // case "event":
    //   postByType = <RouteBoardEvent post={p} />;
    //   break;
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
