import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";

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
  const classes = useStyles();
  const [boards] = useBoards();
  useEffectBoardId();
  const boardArr = boards.map((b: Board) => {
    switch (b.type) {
      case "suggestion":
        return <HomeBoardSuggestion key={b.id} board={b} />;
      case "notice":
      case "vote":
      case "event":
        return <HomeBoardNotice key={b.id} board={b} />;
      // return <HomeBoardVote key={i} board={b} />;
      // return <HomeBoardEvent key={i} board={b} />;
      default:
        return null;
    }
  });
  return <>{boardArr}</>;
}
