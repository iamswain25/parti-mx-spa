import React from "react";
import Button from "@material-ui/core/Button";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function LoginButton() {
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);

  function handleLogin() {
    setVisible(true);
  }
  return (
    <>
      <Button onClick={handleLogin} color="inherit">
        Log-in
      </Button>
    </>
  );
}
