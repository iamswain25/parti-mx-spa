import React from "react";
import { MenuItem } from "@material-ui/core";
import { useLoginModal } from "../store/useGlobalState";

export default function LoginButton() {
  const [, setVisible] = useLoginModal();

  function handleLogin() {
    setVisible(true);
  }
  return (
    <MenuItem onClick={handleLogin} color="inherit">
      로그인
    </MenuItem>
  );
}
