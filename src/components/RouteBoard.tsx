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
import HeaderBoard from "./HeaderBoard";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function RouteBoard() {
  const { board_id } = useParams();
  const [{ user_id }] = useStore();
  const [sort] = useGlobalState(keys.SORT);
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: {
      board_id,
      user_id,
      isAnonymous: !user_id,
      sort: [postSortOptions[sort]],
    },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const { group, type } = data?.mx_boards_by_pk ?? {};
  let boardByType = null;
  switch (type) {
    case "notice":
      boardByType = <RouteBoardNotice board={data?.mx_boards_by_pk} />;
      break;
    case "vote":
      boardByType = <RouteBoardVote board={data?.mx_boards_by_pk} />;
      break;
    case "suggestion":
      boardByType = <RouteBoardSuggestion board={data?.mx_boards_by_pk} />;
      break;
    case "event":
      boardByType = <RouteBoardEvent board={data?.mx_boards_by_pk} />;
      break;
  }
  return (
    <>
      <HeaderBoard title={group?.title} />
      <BoardTabNavigator boards={group?.boards} />
      {boardByType}
    </>
  );
}
