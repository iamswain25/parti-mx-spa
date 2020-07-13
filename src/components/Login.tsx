import React from "react";
import { FormData } from "../types";
import LoginForm from "./LoginForm";
import { auth } from "../config/firebase";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function Login() {
  const history = useHistory();
  const [, setError] = useGlobalState(keys.ERROR);
  useRedirectIfLogin();
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };
  function signupHandler() {
    history.push("/signup");
  }

  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm handleForm={handleForm} />
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={signupHandler}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
