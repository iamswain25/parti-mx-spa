import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { FormData } from "../types";
import { Box, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLoginModal } from "../store/useGlobalState";
import { auth } from "../config/firebase";
import { loginError } from "../helpers/firebaseErrorCode";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

const LoginForm: FunctionComponent = () => {
  const classes = useStyles();
  const [error, setError] = React.useState(undefined);
  const [, setVisible] = useLoginModal();
  const { handleSubmit, register, errors, formState } = useForm<FormData>();
  function closeLoginModal() {
    setVisible(false);
  }
  const handleForm = async (form: FormData) => {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      loginError(error, setError);
    }
  };
  return (
    <>
      {formState.isSubmitting && <LinearProgress />}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography variant="h2">로그인</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleForm)}
            noValidate
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                required: "필수 입력 항목입니다.",
              })}
              required={errors.password ? true : false}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
            />
            {error && <div className={classes.error}>{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disableElevation
              disabled={formState.isSubmitting}
              className={classes.submit}
            >
              로그인
            </Button>
          </form>
          <Box className={classes.label}>
            아직 회원이 아니신가요?
            <Link
              to={`/signup`}
              onClick={closeLoginModal}
              className={classes.link}
            >
              회원가입
            </Link>
          </Box>
          <Box className={classes.label}>
            비밀번호를 잊으셨나요?
            <Link
              to={`/forgot`}
              onClick={closeLoginModal}
              className={classes.link}
            >
              비밀번호 찾기
            </Link>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
