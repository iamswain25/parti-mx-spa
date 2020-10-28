import React from "react";
import { firestore } from "../config/firebase";
import { Board } from "../types";
import { useGroupId } from "./useGlobalState";
export default function useBoards(listen: boolean = false): [Board[]] {
  const [groupId] = useGroupId();
  const [boards, setBoards] = React.useState<Board[]>([]);
  React.useEffect(() => {
    if (listen) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("boards")
        .orderBy("order", "asc")
        .onSnapshot((snapshot) => {
          const boards = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as Board)
          );
          setBoards(boards);
        });
    } else {
      firestore
        .collection("groups")
        .doc(groupId)
        .collection("boards")
        .orderBy("order", "asc")
        .get()
        .then((snapshot) => {
          const boards = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as Board)
          );
          setBoards(boards);
        });
    }
  }, [groupId, listen]);
  return [boards];
}
