import React from "react";
import { useStore } from "../store/store";
import { subsByPostId } from "../graphql/subscription";
import { PagePost } from "../types";
import { useSubscription } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useParams } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
// import { Box, Divider, Typography, Hidden } from "@material-ui/core";
// import HeaderPost from "./HeaderPost";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import useDesktop from "./useDesktop";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import Forbidden from "./Forbidden";
import EventDetail from "./EventDetail";

export default function RoutePost() {
  const { post_id } = useParams();
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
      {/* <Hidden mdUp>
        <HeaderPost post={p} />
      </Hidden>
      <Divider />
      {!isDesktop && (
        <Link
          to={
            p?.board?.type === "suggestion"
              ? `/photo/${p?.board?.id}`
              : `/home/${p?.board?.id}`
          }
        >
          <Box
            pt={1}
            paddingX={2}
            color="primary.dark"
            bgcolor="grey.100"
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2">{p?.board?.title}</Typography>
            <ChevronRightIcon color="primary" fontSize="small" />
          </Box>
        </Link>
      )} */}
      {postByType}
    </>
  );
}
