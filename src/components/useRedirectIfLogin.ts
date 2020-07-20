import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useStore } from "../store/store";
export default function useRedirectIfLogin() {
  const [{ user_id, isInit }] = useStore();

  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state ?? { from: "/" };
  const history = useHistory();
  React.useEffect(() => {
    if (user_id && isInit) {
      console.log("leave!!!");
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
}
