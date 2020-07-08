import React from "react";
import { useStore } from "../store/store";
import { queryByGroupId } from "../graphql/query";
import { HomeGroup, Board } from "../types";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import GroupLogoContainer from "./GroupLogoContainer";
import useParseGroupId from "./useParseGroupId";
import HomeBoardNotice from "./HomeBoardNotice";
const useStyles = makeStyles((theme) => {
  return {
    root: { marginTop: 26 },
    grid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      columnGap: 48,
      marginTop: 24,
    },
  };
});

export default function Home() {
  const [{ user_id, group_id = 34 }] = useStore();
  useParseGroupId();
  const classes = useStyles();
  const { data, error, loading } = useQuery<HomeGroup>(queryByGroupId, {
    variables: { group_id, user_id, isAnonymous: !user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const { notice, suggestion, vote, event } = data?.mx_groups_by_pk ?? {};
  return (
    <div className={classes.root}>
      <GroupLogoContainer data={data} />
      <section className={classes.grid}>
        <ul>
          {notice?.map((b: Board, i: number) => (
            <HomeBoardNotice key={i} board={b} />
          ))}
          {suggestion?.map((b: Board, i: number) => (
            <HomeBoardNotice key={i} board={b} />
          ))}
        </ul>
        <ul>
          {vote?.map((b: Board, i: number) => (
            <HomeBoardNotice key={i} board={b} />
          ))}
          {event?.map((b: Board, i: number) => (
            <HomeBoardNotice key={i} board={b} />
          ))}
        </ul>
      </section>
    </div>
  );
}
