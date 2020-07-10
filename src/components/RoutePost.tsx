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
import { Typography } from "@material-ui/core";
import SuggestionDetail from "./SuggestionDetail";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    root: {
      [theme.breakpoints.up("md")]: { marginTop: 26 },
    },
    grid: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(3),
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 1200,
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: theme.spacing(1),
      },
    },
    left: {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(3),
        width: `calc(66% - ${theme.spacing(3)}px)`,
      },
    },
    right: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(3),
        width: `calc(34% - ${theme.spacing(3)}px)`,
      },
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
  }
  return (
    <>
      <Typography variant="h3" color="textPrimary" className={classes.top}>
        {p?.board?.group?.title}
      </Typography>
      <div className={classes.root}>
        <BoardTabNavigator group={p?.board?.group} />
        {postByType}
      </div>
    </>
  );
}
