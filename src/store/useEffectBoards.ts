import React from "react";
import { firestore } from "../config/firebase";
import { Board } from "../types";
import { useBoards, useGroupId } from "./useGlobalState";
export default function useEffectBoards(): void {
  const [groupId] = useGroupId();
  const [, setBoards] = useBoards();
  React.useEffect(() => {
    if (groupId) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("boards")
        .orderBy("order", "asc")
        .onSnapshot(
          (snapshot) => {
            const boards = snapshot.docs.map(
              (doc) => ({ id: doc.id, ...(doc.data() as any) } as Board)
            );
            if (boards) {
              setBoards(boards);
            } else {
              setBoards([]);
            }
          },
          (error) => {
            console.warn("useEffectBoards", error);
          }
        );
    }
  }, [groupId, setBoards]);
}
