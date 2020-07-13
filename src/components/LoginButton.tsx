import React from "react";
import Button from "@material-ui/core/Button";
import LoginModal from "./LoginModal";

export default function LoginButton() {
  const [isVisible, setVisible] = React.useState(false);

  function handleLogin() {
    setVisible(true);
  }
  return (
    <>
      <Button onClick={handleLogin} color="inherit">
        로그인
      </Button>
      <LoginModal isVisible={isVisible} setVisible={setVisible} />
    </>
  );
}
