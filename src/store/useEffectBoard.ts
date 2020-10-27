import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useBoard, useBoardId, useGroupId } from "./useGlobalState";
export default function useEffectBoard() {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const [board, setBoard] = useBoard();
  React.useEffect(() => {
    if (board_id !== board?.id) {
      setBoard(undefined);
      return firestore
        .collection("groups")
        .doc(group_id)
        .collection("boards")
        .doc(board_id)
        .onSnapshot((doc) => setBoard({ id: doc.id, ...(doc.data() as any) }));
    }
  }, [board_id, board, setBoard]);
  return [board];
}
