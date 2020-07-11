import React from "react";
import { useStore } from "../store/store";
import { queryByPostId } from "../graphql/query";
import { PagePost } from "../types";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import BoardTabNavigator from "./BoardTabNavigator";
import { useParams } from "react-router-dom";
import SuggestionDetail from "./SuggestionDetail";
import { Box } from "@material-ui/core";
import HeaderPost from "./HeaderPost";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
    },
    root: {
      [theme.breakpoints.up("md")]: { marginTop: 26 },
    },
  };
});

export default function RoutePost() {
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const { data, error, loading } = useQuery<PagePost>(queryByPostId, {
    variables: { post_id, user_id, isAnonymous: !user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const p = data?.mx_posts_by_pk;
  let postByType = null;
  switch (p?.board?.type) {
    case "notice":
      postByType = <SuggestionDetail post={p} />;
      break;
    // case "vote":
    //   postByType = <RouteBoardVote board={p} />;
    //   break;
    // case "suggestion":
    //   postByType = <RouteBoardSuggestion board={p} />;
    //   break;
    // case "event":
    //   postByType = <RouteBoardEvent board={p} />;
    //   break;
    default:
      postByType = <SuggestionDetail post={p} />;
  }
  return (
    <>
      <HeaderPost title={p?.board?.group?.title} />
      <Box className={classes.root}>
        <BoardTabNavigator group={p?.board?.group} />
        {postByType}
      </Box>
    </>
  );
}
