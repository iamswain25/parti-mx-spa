import React from "react";
import HomeBoardNotice from "./HomeBoardNotice";
import HomeBoardSuggestion from "./HomeBoardSuggestion";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import useEffectBoardId from "../store/useEffectBoardId";
import ScheduleImgs from "./ScheduleImgs";

export default function Home() {
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
  return (
    <>
      {boardArr}
      <ScheduleImgs />
    </>
  );
}
