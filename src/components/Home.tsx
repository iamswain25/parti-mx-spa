import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GroupLogoContainer from "./GroupLogoContainer";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import BoardTabNavigator from "./BoardTabNavigator";
import GreyDivider from "./GreyDivider";
import useDesktop from "./useDesktop";
import useBoards from "../store/useBoards";
import { Board } from "../types";
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

export default function Home() {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [boards] = useBoards(true);
  const notice = boards.filter((b) => b.type === "notice");
  const suggestion = boards.filter((b) => b.type === "suggestion");
  const vote = boards.filter((b) => b.type === "vote");
  const event = boards.filter((b) => b.type === "event");
  return (
    <>
      {isDesktop ? (
        <section className={classes.grid}>
          <ul className={classes.left}>
            {notice?.map((b: Board) => (
              <HomeBoardNotice key={b.id} board={b} />
            ))}
            {suggestion?.map((b: Board) => (
              <HomeBoardSuggestion key={b.id} board={b} />
            ))}
          </ul>
          <ul className={classes.right}>
            {vote?.map((b: Board) => (
              <HomeBoardVote key={b.id} board={b} />
            ))}
            {event?.map((b: Board) => (
              <HomeBoardEvent key={b.id} board={b} />
            ))}
          </ul>
        </section>
      ) : (
        //모바일
        <section className={classes.grid}>
          {notice?.map((b: Board) => (
            <HomeBoardNotice key={b.id} board={b} />
          ))}
          {vote?.map((b: Board) => (
            <HomeBoardVote key={b.id} board={b} />
          ))}
          {suggestion?.map((b: Board) => (
            <HomeBoardSuggestion key={b.id} board={b} />
          ))}
          {event?.map((b: Board) => (
            <HomeBoardEvent key={b.id} board={b} />
          ))}
        </section>
      )}
    </>
  );
}
