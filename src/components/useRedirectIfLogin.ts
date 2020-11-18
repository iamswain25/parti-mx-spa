import React from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
export default function useRedirectIfLogin() {
  const history = useHistory<{ from: { pathname: string } }>();
  const { from } = history.location.state ?? { from: "/" };
  const [currentUser] = useCurrentUser();
  React.useEffect(() => {
    if (currentUser?.email) {
      alert("로그인 되었습니다.");
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]);
}
