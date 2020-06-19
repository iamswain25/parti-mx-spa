import React from "react";

import "./index.sass";
import { FormData } from "../../types";
import LoginForm from "../../components/LoginForm";
import { auth } from "../../services/firebase";
import Alert from "@material-ui/lab/Alert";

export default function Login() {
  const [error, setError] = React.useState<undefined | { message: string }>(
    undefined
  );
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
      {!!error && <Alert severity="error">{error.message}</Alert>}
      <div className="login-container__form">
        <LoginForm handleForm={handleForm} />
      </div>
    </div>
  );
}
