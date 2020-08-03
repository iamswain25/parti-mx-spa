import React from "react";
import { FormData } from "../types";
import LoginForm from "./LoginForm";
import { auth } from "../config/firebase";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function Login() {
  const [, setError] = useGlobalState(keys.ERROR);
  const [, setLoading] = useGlobalState(keys.LOADING);
  useRedirectIfLogin();

  React.useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
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
