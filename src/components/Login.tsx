import React from "react";
import { FormData } from "../types";
import LoginForm from "./LoginForm";
import { auth } from "../config/firebase";
import { useStore } from "../store/store";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [, dispatch] = useStore();
  const history = useHistory();
  useRedirectIfLogin();
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch({ type: "SET_ERROR", error });
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
