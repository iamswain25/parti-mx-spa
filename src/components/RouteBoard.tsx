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
// import Forbidden from "./Forbidden";
import useBoard from "../store/useBoard";
import useEffectParams from "../store/useEffectParams";

export default function RouteBoard() {
  const [board] = useBoard();
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
