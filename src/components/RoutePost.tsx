import React from "react";
import { subsByPostId } from "../graphql/subscription";
import { getGroupByPostId } from "../graphql/query";
import { PagePost } from "../types";
import { useQuery, useSubscription } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams, Link } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import { Box, Divider, Typography, Hidden } from "@material-ui/core";
import HeaderPost from "./HeaderPost";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BoardTabNavigator from "./BoardTabNavigator";
import useDesktop from "./useDesktop";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import Forbidden from "./Forbidden";
import EventDetail from "./EventDetail";
import usePermEffect from "./usePermEffect";
import useGroupIdEffect from "./useGroupIdEffect";

export default function RoutePost() {
  const { post_id } = useParams<{ post_id: string }>();
  const [isDesktop] = useDesktop();
  const { data, error, loading } = useSubscription<PagePost>(subsByPostId, {
    variables: { post_id },
  });
  const groupQuery = useQuery(getGroupByPostId, { variables: { post_id } });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const p = data?.mx_posts_by_pk;
  usePermEffect(groupQuery.data?.group?.[0]?.status);
  useGroupIdEffect(groupQuery.data?.group?.[0]?.id);

  if (loading) return null;
  if (!p) return <Forbidden />;

  let postByType = null;
  switch (p?.board?.type) {
    case "notice":
      postByType = <NoticeDetail post={p} />;
      break;
    case "vote":
      postByType = <VoteDetail post={p} />;
      break;
    case "suggestion":
      postByType = <SuggestionDetail post={p} />;
      break;
    case "event":
      postByType = <EventDetail post={p} />;
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
      {isDesktop ? (
        <BoardTabNavigator board={p?.board} />
      ) : (
        <Link to={`/home/${p?.board?.id}`}>
          <Box
            pt={1}
            paddingX={2}
            color="primary.dark"
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2">{p?.board?.title}</Typography>
            <ChevronRightIcon color="primary" fontSize="small" />
          </Box>
        </Link>
      )}
      {postByType}
    </>
  );
}
