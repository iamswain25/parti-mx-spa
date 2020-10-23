import React from "react";
import { firestore, auth } from "../config/firebase";
import { User } from "../types";
export default function useUser(): [User | null] {
  const currentUser = auth.currentUser;
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    if (currentUser) {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const item = { id: doc.id, ...doc.data() } as User;
          setUser(item);
        });
    }
  });
  return [user];
}
