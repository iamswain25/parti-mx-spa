import React from "react";
import { auth } from "../config/firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  Button,
  Typography,
  Container,
  LinearProgress,
} from "@material-ui/core";
import { DOMAIN } from "../helpers/options";
import { useSuccess } from "../store/useGlobalState";
import { loginError } from "../helpers/firebaseErrorCode";
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
  error: {
    color: theme.palette.error.main,
    whiteSpace: "break-spaces",
  },
}));
type FormEmail = { email: string };
export default function PasswordForgot() {
  const classes = useStyles();
  const [error, setError] = React.useState(undefined);
  const [, setSuccess] = useSuccess();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    formState,
  } = useForm<FormEmail>();
  async function formHandler(form: FormEmail) {
    const { email } = form;
    const actionCodeSettings = {
      url: DOMAIN,
      handleCodeInApp: true,
    };
    try {
      await auth.sendPasswordResetEmail(email, actionCodeSettings);
      // await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      setSuccess(email + "로 이메일을 보냈습니다. 1시간 이내에 확인 바랍니다.");
      reset();
    } catch (error) {
      loginError(error, setError);
    }
  }

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
        {formState.isSubmitting && <LinearProgress />}
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
              required: "필수 입력 항목입니다.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "올바른 이메일 주소를 입력하세요.",
              },
            })}
            required={errors.email ? true : false}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
          {error && <div className={classes.error}>{error}</div>}
          <div className={classes.wrapper}>
            <Button
              disabled={formState.isSubmitting}
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
