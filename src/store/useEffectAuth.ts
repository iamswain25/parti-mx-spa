import React from "react";
import { auth } from "../config/firebase";
import { useCurrentUser } from "./useGlobalState";
export default function useEffectAuth(): [firebase.User | null | undefined] {
  const [user, setUser] = useCurrentUser();
  React.useEffect(() => {
    if (window.location.host === "policy-fair-mix.web.app") {
      if (
        window.confirm(
          "잠시 후 제19회 전국주민자치박람회 공식 웹사이트로 이동합니다."
        )
      ) {
        window.location.replace(
          "https://juminexpo.kr" + window.location.pathname
        );
      }
    }
    return auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser({ ...user });
      } else {
        auth.signInAnonymously();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [user];
}
