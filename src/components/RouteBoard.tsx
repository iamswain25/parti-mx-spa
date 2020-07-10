import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { HomeGroup, Board, PageBoard } from "../types";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import GroupLogoContainer from "./GroupLogoContainer";
import useParseGroupId from "./useParseGroupId";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import BoardTabNavigator from "./BoardTabNavigator";
import GreyDivider from "./GreyDivider";
import useDesktop from "./useDesktop";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
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

export default function RouteBoard() {
  const { board_id } = useParams();
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: { board_id, user_id, isAnonymous: !user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const [isDesktop] = useDesktop();
  const { group } = data?.mx_boards_by_pk ?? {};
  return (
    <>
      <Typography variant="h3" color="textPrimary" className={classes.top}>
        {group?.title}
      </Typography>
      <div className={classes.root}>
        {isDesktop && <GroupLogoContainer group={group} />}
        <BoardTabNavigator group={group} />
        {isDesktop ? (
          <section className={classes.grid}></section>
        ) : (
          <section className={classes.grid}></section>
        )}
      </div>
    </>
  );
}
