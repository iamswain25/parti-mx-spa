import React from "react";
import { useParams } from "react-router-dom";
import { useBoardId, useGroupId } from "./useGlobalState";
export default function useEffectParams(props?: { board_id?: string }) {
  const { group_id, board_id } = useParams<{
    group_id: string;
    board_id: string;
  }>();
  const groupState = useGroupId();
  const boardState = useBoardId();
  React.useEffect(() => {
    if (group_id && group_id !== groupState[0]) {
      groupState[1](group_id);
    }
  }, [group_id, groupState]);
  React.useEffect(() => {
    if (board_id !== boardState[0]) {
      boardState[1](board_id);
    }
  }, [board_id, boardState]);
  return [groupState, boardState];
}
