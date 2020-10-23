import React from "react";
import { Link } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import { Box, Divider, Typography, Hidden } from "@material-ui/core";
import HeaderPost from "./HeaderPost";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BoardTabNavigator from "./BoardTabNavigator";
import useDesktop from "./useDesktop";
import NoticeDetail from "./NoticeDetail";
import VoteDetail from "./VoteDetail";
import EventDetail from "./EventDetail";
import usePost from "../store/usePost";

export default function RoutePost() {
  const [isDesktop] = useDesktop();
  const [p] = usePost(true);
  let postByType = null;
  switch (p?.type) {
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
      postByType = null;
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
