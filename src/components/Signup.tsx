import React from "react";
import { FormData } from "../types";
import { auth } from "../config/firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { useStore } from "../store/store";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Signup() {
  const [, dispatch] = useStore();
  useRedirectIfLogin();
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<FormData>();
  async function formHandler(form: FormData) {
    const { email, password } = form;
    dispatch({ type: "SET_LOADING", loading: true });
    await auth.createUserWithEmailAndPassword(email, password);
  }

  return (
    <div className="login-container">
      <h1>회원가입</h1>
      <form
        onSubmit={handleSubmit(formHandler)}
        noValidate
        className={classes.form}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          inputRef={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          })}
          required={errors.email ? true : false}
          error={errors.email ? true : false}
          helperText={errors.email && errors.email.message}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          inputRef={register({
            required: "Required",
          })}
          required={errors.password ? true : false}
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
        />
        <div className={classes.wrapper}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            가입
          </Button>
        </div>
      </form>
    </div>
  );
}
