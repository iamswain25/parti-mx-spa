import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import ScheduleImgs from "./ScheduleImgs";
import HomeBoardEvent from "./HomeBoardEvent";
import { LinearProgress } from "@material-ui/core";

export default function Home() {
  const [boards] = useBoards();
  useEffectBoardId();
  const boardArr = boards.map((b: Board) => {
    switch (b.type) {
      case "suggestion":
        return <HomeBoardSuggestion key={b.id} board={b} />;
      case "notice":
      case "vote":
        return <HomeBoardNotice key={b.id} board={b} />;
      case "event":
        return <HomeBoardEvent key={b.id} board={b} />;
      // return <HomeBoardVote key={i} board={b} />;
      default:
        return null;
    }
  });
  return (
    <>
      {boardArr.length > 0 ? boardArr : <LinearProgress />}
      <ScheduleImgs />
    </>
  );
}
