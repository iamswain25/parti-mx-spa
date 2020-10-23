import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
export default function useRedirectIfLogin() {
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state ?? { from: "/" };
  const history = useHistory();
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser?.email) {
      console.log("leave!!!");
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
}
