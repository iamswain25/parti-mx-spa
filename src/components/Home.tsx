import React from "react";
import { useStore } from "../store/store";
import { queryByGroupId } from "../graphql/query";
import { HomeGroup, Board } from "../types";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import GroupLogoContainer from "./GroupLogoContainer";
import BoardTabNavigator from "./BoardTabNavigator";
const useStyles = makeStyles((theme) => {
  return {
    grid: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(3),
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 1200,
        flexDirection: "column",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: theme.spacing(1),
      },
    },
  };
});

export default function Home() {
  const [{ group_id }] = useStore();
  const classes = useStyles();
  const { data, error, loading } = useQuery<HomeGroup>(queryByGroupId, {
    variables: { group_id },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const group = data?.mx_groups_by_pk;
  let boards = null;
  if (group) {
    const { notice, suggestion, vote, event } = group || {};
    boards = [...suggestion, ...notice, ...vote, ...event]
      .sort((a, b) => a.order - b.order)
      .map((b: Board, i: number) => {
        switch (b.type) {
          case "suggestion":
            return <HomeBoardSuggestion key={i} board={b} />;
          case "notice":
          case "vote":
          case "event":
            return <HomeBoardNotice key={i} board={b} />;
          // return <HomeBoardVote key={i} board={b} />;
          // return <HomeBoardEvent key={i} board={b} />;
          default:
            return null;
        }
      });
  }

  return (
    <>
      <GroupLogoContainer />
      <BoardTabNavigator />
      <section className={classes.grid}>{boards}</section>
    </>
  );
}
