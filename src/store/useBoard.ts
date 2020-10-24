import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { Board } from "../types";
export default function useBoard(listen: Boolean = false): [Board] {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const [item, setItem] = React.useState<Board>({} as Board);
  React.useEffect(() => {
    if (listen) {
      return firestore
        .collection("groups")
        .doc(group_id)
        .collection("boards")
        .doc(board_id)
        .onSnapshot((doc) => {
          const item = { id: doc.id, ...doc.data() } as Board;
          setItem(item);
        });
    } else {
      firestore
        .collection("groups")
        .doc(group_id)
        .collection("boards")
        .doc(board_id)
        .get()
        .then((doc) => {
          const item = { id: doc.id, ...doc.data() } as Board;
          setItem(item);
        });
    }
  }, [board_id, group_id]);
  return [item];
}
