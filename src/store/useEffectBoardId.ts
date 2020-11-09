import React from "react";
import { useParams } from "react-router-dom";
import { useBoardId } from "./useGlobalState";
export default function useEffectBoardId(props?: { board_id?: string }) {
  const { board_id } = useParams<{
    board_id: string;
  }>();
  const boardState = useBoardId();
  React.useEffect(() => {
    const [boardId, setBoardId] = boardState;
    if (board_id !== boardId) {
      setBoardId(board_id);
    }
  }, [board_id, boardState]);
  return boardState;
}
