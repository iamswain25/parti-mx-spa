import React from "react";
import "./index.sass";
import { FormData } from "../../types";
import LoginForm from "../../components/LoginForm";
import { auth } from "../../config/firebase";
import Alert from "@material-ui/lab/Alert";
import { useLocation, Redirect } from "react-router-dom";
import { useStore } from "../../store/store";

export default function Login() {
  const [error, setError] = React.useState<undefined | { message: string }>(
    undefined
  );
  const [{ user_id, isInit }] = useStore();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("to");
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      leave();
    } catch (error) {
      setError(error);
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
      {!!error && <Alert severity="error">{error.message}</Alert>}
      <div className="login-container__form">
        <LoginForm handleForm={handleForm} />
      </div>
    </div>
  );
}
