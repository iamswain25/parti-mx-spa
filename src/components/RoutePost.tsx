import React from "react";
import { useStore } from "../store/store";
// import { queryByPostId } from "../graphql/query";
import { subsByPostId } from "../graphql/subscription";
import { PagePost } from "../types";
import { useSubscription } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams, Link } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import { Box, Divider, Typography } from "@material-ui/core";
import HeaderPost from "./HeaderPost";
// import useDesktop from "./useDesktop";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BoardTabNavigator from "./BoardTabNavigator";
import useDesktop from "./useDesktop";
import DesktopHeader from "./DesktopHeader";
import NoticeDetail from "./NoticeDetail";

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
  let postByType = null;
  switch (p?.board?.type) {
    case "notice":
      postByType = <NoticeDetail post={p} />;
      break;
    // case "vote":
    //   postByType = <RouteBoardVote board={p} />;
    //   break;
    case "suggestion":
      postByType = <SuggestionDetail post={p} />;
      break;
    // case "event":
    //   postByType = <RouteBoardEvent board={p} />;
    //   break;
    default:
      postByType = <SuggestionDetail post={p} />;
  }
  return (
    <>
      {isDesktop ? (
        <DesktopHeader />
      ) : (
        <HeaderPost title={p?.board?.group?.title} />
      )}

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
