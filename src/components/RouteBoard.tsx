import React from "react";

import { PageBoard } from "../types";

import useErrorEffect from "./useErrorEffect";
import RouteBoardNotice from "./RouteBoardNotice";
import BoardTabNavigator from "./BoardTabNavigator";
import RouteBoardVote from "./RouteBoardVote";
import RouteBoardSuggestion from "./RouteBoardSuggestion";
import RouteBoardEvent from "./RouteBoardEvent";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import usePermEffect from "./usePermEffect";
import Forbidden from "./Forbidden";
import useBoard from "../store/useBoard";

export default function RouteBoard() {
  const [board] = useBoard();
  const { type } = board;
  let boardByType = null;
  switch (type) {
    case "notice":
      boardByType = <RouteBoardNotice board={board} />;
      break;
    case "vote":
      boardByType = <RouteBoardVote board={board} />;
      break;
    case "suggestion":
      boardByType = <RouteBoardSuggestion board={board} />;
      break;
    case "event":
      boardByType = <RouteBoardEvent board={board} />;
      break;
  }

  return (
    <>
      <BoardTabNavigator board={board} />
      {boardByType}
    </>
  );
}
