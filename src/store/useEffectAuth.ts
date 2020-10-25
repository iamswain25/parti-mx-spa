import React from "react";
import { auth } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";
export default function useEffectAuth(): [firebase.User | null | undefined] {
  const [user, setUser] = useCurrentUser();
  React.useEffect(() => {
    return auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        auth.signInAnonymously();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [user];
}
