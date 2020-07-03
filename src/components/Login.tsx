import React from "react";
import { FormData } from "../types";
import LoginForm from "./LoginForm";
import { auth } from "../config/firebase";
import { useLocation, Redirect } from "react-router-dom";
import { useStore } from "../store/store";

export default function Login() {
  const [{ user_id, isInit }, dispatch] = useStore();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("to");
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      leave();
    } catch (error) {
      dispatch({ type: "SET_ERROR", error });
    }
  };
  function leave() {
    console.log("leave!!!");
    if (redirect) {
      return <Redirect to={"/" + redirect} />;
    } else {
      return <Redirect to={"/"} />;
    }
  }

  if (user_id !== null && isInit) {
    return leave();
  }
  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm handleForm={handleForm} />
      </div>
    </div>
  );
}
