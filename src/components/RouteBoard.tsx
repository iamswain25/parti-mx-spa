import React from "react";
import RouteBoardNotice from "./RouteBoardNotice";
import RouteBoardVote from "./RouteBoardVote";
import RouteBoardSuggestion from "./RouteBoardSuggestion";
import RouteBoardEvent from "./RouteBoardEvent";
import useBoard from "../store/useBoard";
import useEffectParams from "../store/useEffectParams";

export default function RouteBoard() {
  const [board] = useBoard();
  console.log(board);
  useEffectParams();
  const { type } = board;
  switch (type) {
    case "notice":
      return <RouteBoardNotice board={board} />;
    case "vote":
      return <RouteBoardVote board={board} />;
    case "suggestion":
      return <RouteBoardSuggestion board={board} />;
    case "event":
      return <RouteBoardEvent board={board} />;
    default:
      return null;
  }
}
