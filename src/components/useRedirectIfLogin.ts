import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useStore } from "../store/store";
import { auth } from "../config/firebase";
export default function useRedirectIfLogin() {
  const [{ user_id, isInit }] = useStore();

  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state ?? { from: "/" };
  const history = useHistory();

  React.useEffect(() => {
    if (user_id && isInit) {
      if (auth.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }
        auth
          .signInWithEmailLink(email as string, window.location.href)
          .then(function (result) {
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch(function (error) {});
      }
      console.log("leave!!!");
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
}
