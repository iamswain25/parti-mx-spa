import React from "react";
import { auth } from "../config/firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Button, Typography, Container } from "@material-ui/core";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { useGlobalState, keys } from "../store/useGlobalState";
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
  link: {
    marginLeft: theme.spacing(1),
    color: "#002bff",
    cursor: "pointer",
  },
  label: {
    fontSize: 12,
    letterSpacing: -0.55,
    color: "#212121",
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
type FormEmail = { email: string };
export default function PasswordForgot() {
  const classes = useStyles();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setError] = useGlobalState(keys.ERROR);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const { handleSubmit, register, errors, reset } = useForm<FormEmail>();
  async function formHandler(form: FormEmail) {
    const { email } = form;
    setLoading(true);
    const actionCodeSettings = {
      url: "https://youthwagle.kr",
      handleCodeInApp: true,
    };
    try {
      await auth.sendPasswordResetEmail(email, actionCodeSettings);
      // await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      setSuccess(email + "로 이메일을 보냈습니다. 1시간 이내에 확인 바랍니다.");
      reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <Typography variant="h2">비밀번호 찾기</Typography>
        <form
          onSubmit={handleSubmit(formHandler)}
          noValidate
          autoComplete="off"
          className={classes.form}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "맞지 않는 이메일 형식 입니다.",
              },
            })}
            required={errors.email ? true : false}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              비밀번호 찾기
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
