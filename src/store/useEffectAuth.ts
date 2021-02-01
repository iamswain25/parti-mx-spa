import React from "react";
import { auth } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";
import firebase from "firebase";
export default function useEffectAuth(): [firebase.User | null | undefined] {
  const [user, setUser] = useCurrentUser();
  React.useEffect(() => {
    return auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser({ ...user });
        if (!user.emailVerified) {
          // window.location.replace("/verification");
        }
      } else {
        auth.signInAnonymously();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [user];
}
