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
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import useDesktop from "./useDesktop";
import Forbidden from "./Forbidden";
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
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: theme.spacing(1),
      },
    },
  };
});

export default function Home() {
  const [{ user_id, group_id }, dispatch] = useStore();
  const classes = useStyles();
  React.useEffect(() => {
    dispatch({ type: "SET_BOARD", board_id: null });
  }, [dispatch]);
  const { data, error, loading } = useQuery<HomeGroup>(queryByGroupId, {
    variables: { group_id, user_id, isAnonymous: !user_id },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const [isDesktop] = useDesktop();
  const group = data?.mx_groups_by_pk;
  if (loading) {
    return null;
  }
  if (!group) {
    return (
      <>
        <Forbidden />
      </>
    );
  }
  const { notice, suggestion, vote, event } = group;

  return (
    <>
      {isDesktop ? (
        <section className={classes.grid}>
          <ul>
            {notice?.map((b: Board, i: number) => (
              <HomeBoardNotice key={i} board={b} />
            ))}
            {suggestion?.map((b: Board, i: number) => (
              <HomeBoardSuggestion key={i} board={b} />
            ))}
          </ul>
        </section>
      ) : (
        //모바일
        <section className={classes.grid}>
          {notice?.map((b: Board, i: number) => (
            <HomeBoardNotice key={i} board={b} />
          ))}
          {vote?.map((b: Board, i: number) => (
            <HomeBoardVote key={i} board={b} />
          ))}
          {suggestion?.map((b: Board, i: number) => (
            <HomeBoardSuggestion key={i} board={b} />
          ))}
          {event?.map((b: Board, i: number) => (
            <HomeBoardEvent key={i} board={b} />
          ))}
        </section>
      )}
    </>
  );
}
