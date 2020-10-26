import React from "react";
import { firestore, auth } from "../config/firebase";
import { User } from "../types";
export default function useUser({
  id,
  listen = false,
}: {
  id: string;
  listen?: boolean;
}): [User | null] {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    if (listen) {
      firestore
        .collection("users")
        .doc(id)
        .onSnapshot((doc) => {
          const item = { id: doc.id, ...doc.data() } as User;
          setUser(item);
        });
    } else {
      firestore
        .collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          const item = { id: doc.id, ...doc.data() } as User;
          setUser(item);
        });
    }
  }, [id, listen]);
  return [user];
}