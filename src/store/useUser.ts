import React from "react";
import { firestore } from "../config/firebase";
import { User } from "../types";
export default function useUser({
  id,
  listen = false,
}: {
  id?: string;
  listen?: boolean;
}): [User | null] {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    let isCancelled = false;
    if (id) {
      if (listen) {
        return firestore
          .collection("users")
          .doc(id)
          .onSnapshot(doc => {
            const item = { id: doc.id, ...doc.data() } as User;
            setUser(item);
          });
      } else {
        if (isCancelled) return;
        firestore
          .collection("users")
          .doc(id)
          .get()
          .then(doc => {
            const item = { id: doc.id, ...doc.data() } as User;
            setUser(item);
          });
        return () => {
          isCancelled = true;
          setUser(null);
        };
      }
    }
  }, [id, listen]);
  return [user];
}
