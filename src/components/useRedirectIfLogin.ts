import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import useUser from "../store/useUser";
export default function useRedirectIfLogin() {
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state ?? { from: "/" };
  const history = useHistory();
  const [user] = useUser();
  React.useEffect(() => {
    if (user) {
      console.log("leave!!!");
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}
