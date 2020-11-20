import React from "react";
import { firestore } from "../config/firebase";
import { COUNTER_DOC, PARAM_COLLECTION } from "../helpers/options";
import { BoardCounter } from "../types";
import { useGroupId } from "./useGlobalState";

export default function useBoardCounter({
  board_id,
  listen = true,
}: {
  board_id?: string;
  listen?: Boolean;
}): [BoardCounter | null | undefined] {
  const [item, setItem] = React.useState<BoardCounter | null | undefined>(
    undefined
  );
  const [group_id] = useGroupId();
  React.useEffect(() => {
    if (group_id && board_id) {
      let docRef = firestore.doc(
        `groups/${group_id}/boards/${board_id}/${PARAM_COLLECTION}/${COUNTER_DOC}`
      );
      if (listen) {
        return docRef.onSnapshot(
          (doc) => {
            if (doc.exists) {
              const item = { ...doc.data() } as BoardCounter;
              setItem(item);
            } else {
              setItem(null);
            }
          },
          (error) => {
            console.warn("useBoardBoardCounter", error);
          }
        );
      } else {
        docRef.get().then((doc) => {
          if (doc.exists) {
            const item = { ...doc.data() } as BoardCounter;
            setItem(item);
          } else {
            setItem(null);
          }
        });
      }
    }
  }, [group_id, board_id, listen]);
  return [item];
}
