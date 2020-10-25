import React from "react";
import { firestore } from "../config/firebase";
import { User } from "../types";
import { keys, useGlobalState } from "./useGlobalState";
export default function useMe(): [User | null] {
  const [firebaseUser] = useGlobalState(keys.USER);
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    if (firebaseUser) {
      firestore
        .collection("users")
        .doc(firebaseUser.uid)
        .get()
        .then((doc) => {
          const item = { id: doc.id, ...doc.data() } as User;
          setUser(item);
        });
    }
  }, [firebaseUser]);
  return [user];
}
