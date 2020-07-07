import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useStore } from "../store/store";

export default function useRedirectIfLogin() {
  const [{ user_id, isInit }] = useStore();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("to");
  const history = useHistory();
  React.useEffect(() => {
    if (user_id && isInit) {
      console.log("leave!!!");
      if (redirect) {
        return history.push("/" + redirect);
      } else {
        return history.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
}
