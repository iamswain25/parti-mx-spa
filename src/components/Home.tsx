import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import HomeBoardVote from "./HomeBoardVote";
import HomeBoardEvent from "./HomeBoardEvent";
import useDesktop from "./useDesktop";
import useBoards from "../store/useBoards";
import { Board } from "../types";
import useEffectParams from "../store/useEffectParams";
const useStyles = makeStyles((theme) => {
  return {
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
  useEffectParams();
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
        <>
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
        </>
      ) : (
        //모바일
        <>
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
        </>
      )}
    </>
  );
}
