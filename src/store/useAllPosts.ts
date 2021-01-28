import React from "react";
import { firestore } from "../config/firebase";
import { Post } from "../types";
import { useGroupId } from "./useGlobalState";
export default function useAllPosts<T extends Post>(): [
  T[] | undefined | null,
] {
  const [groupId] = useGroupId();
  const [items, setItems] = React.useState<T[] | undefined | null>(undefined);
  React.useEffect(() => {
    if (groupId) {
      let query = firestore
        .collection("posts")
        .where("group_id", "==", groupId)
        .where("is_closed", "==", false);
      query
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            setItems(null);
          } else {
            const items = snapshot.docs.map(
              doc => ({ id: doc.id, ...(doc.data() as any) } as T),
            );
            console.log(items);
            setItems(items);
          }
        })
        .catch(error => {
          console.warn("useAllPosts", error);
        });
      return () => setItems(undefined);
    }
  }, [groupId]);
  return [items];
}
