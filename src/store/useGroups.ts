import React from "react";
import { firestore } from "../config/firebase";
import { Group } from "../types";
export default function useGroups(listen: boolean = false): [Group[]] {
  const [items, setItems] = React.useState<Group[]>([] as Group[]);
  React.useEffect(() => {
    if (listen) {
      return firestore.collection("groups").onSnapshot((snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...(doc.data() as any) } as Group)
        );
        setItems(items);
      });
    } else {
      firestore
        .collection("groups")
        .get()
        .then((snapshot) => {
          const items = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...(doc.data() as any) } as Group)
          );
          setItems(items);
        });
    }
  }, [listen, setItems]);
  return [items];
}
