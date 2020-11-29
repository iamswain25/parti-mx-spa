import React from "react";
import LoginForm from "./LoginForm";
import useRedirectIfLogin from "./useRedirectIfLogin";

export default function Login() {
  useRedirectIfLogin();

  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm />
      </div>
    </div>
  );
}
