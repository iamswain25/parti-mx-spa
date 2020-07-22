import React from "react";
import { useStore } from "../store/store";
import { subsByPostId } from "../graphql/subscription";
import { PagePost } from "../types";
import { useSubscription } from "@apollo/client";
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

export default function RoutePost() {
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const [isDesktop] = useDesktop();
  const { data, error, loading } = useSubscription<PagePost>(subsByPostId, {
    variables: { post_id, user_id, isAnonymous: !user_id },
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
      postByType = <SuggestionDetail post={p} />;
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
      {isDesktop ? (
        <BoardTabNavigator
          boards={p?.board?.group?.boards}
          board_id={p?.board?.id}
        />
      ) : (
        <Link to={`/home/${p?.board.id}`}>
          <Box
            mt={1}
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
