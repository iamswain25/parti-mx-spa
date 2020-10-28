import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../config/firebase";

export default function Logout() {
  React.useEffect(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      auth.signOut();
    }
  }, []);
  return <Redirect to="/" />;
}
