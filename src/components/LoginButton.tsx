import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
import { MenuItem } from "@material-ui/core";

export default function LoginButton() {
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);

  function handleLogin() {
    setVisible(true);
  }
  return (
    <>
      <MenuItem onClick={handleLogin} color="inherit">
        로그인
      </MenuItem>
    </>
  );
}
