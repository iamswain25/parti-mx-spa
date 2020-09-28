import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import RouteBoardNotice from "./RouteBoardNotice";
import BoardTabNavigator from "./BoardTabNavigator";
import { useParams } from "react-router-dom";
import RouteBoardVote from "./RouteBoardVote";
import RouteBoardSuggestion from "./RouteBoardSuggestion";
import RouteBoardEvent from "./RouteBoardEvent";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import usePermEffect from "./usePermEffect";
import Forbidden from "./Forbidden";

export default function RouteBoard() {
  const { board_id } = useParams<{ board_id: string }>();
  const [{ user_id }] = useStore();
  const [sort] = useGlobalState(keys.SORT);
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: {
      board_id,
      user_id,
      isAnonymous: !user_id,
      sort: [postSortOptions[sort]],
    },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const board = data?.mx_boards_by_pk;
  usePermEffect(board?.group?.status);
  if (loading) {
    return null;
  }
  if (!board) {
    return <Forbidden />;
  }
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
