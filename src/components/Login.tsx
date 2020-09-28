import React from "react";
import { FormData } from "../types";
import LoginForm from "./LoginForm";
import { auth } from "../config/firebase";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { useGlobalState, keys } from "../store/useGlobalState";
import { loginError } from "../helpers/firebaseErrorCode";
import useLoadingEffect from "./useLoadingEffect";

export default function Login() {
  const [, setError] = useGlobalState(keys.ERROR);
  useLoadingEffect(false);
  useRedirectIfLogin();
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // @ts-ignore
      wsLink.subscriptionClient.close(false);
    } catch (error) {
      loginError(error, setError);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm handleForm={handleForm} />
      </div>
    </div>
  );
}
