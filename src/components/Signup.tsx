import React from "react";
import { auth } from "../config/firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Button, Typography, Container, Box } from "@material-ui/core";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { useGlobalState, keys } from "../store/useGlobalState";
import { Link } from "react-router-dom";
import { client } from "../config/ApolloSetup";
import { updateUserInfo } from "../graphql/mutation";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
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
}));
export interface SignupForm {
  email: string;
  name: string;
  password: string;
  org: string;
}
let updateUser: Function | undefined = undefined;
export default function Signup() {
  useRedirectIfLogin(updateUser);
  const classes = useStyles();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setError] = useGlobalState(keys.ERROR);
  const formControl = useForm<SignupForm>();
  const { handleSubmit, register, errors } = formControl;
  React.useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  async function formHandler(form: SignupForm) {
    const { email, password, name, org } = form;
    setLoading(true);
    try {
      updateUser = (user_id: number) => {
        const metadata = { org };
        return client.mutate({
          mutation: updateUserInfo,
          variables: { metadata, name, user_id },
        });
      };
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <Typography variant="h2">회원가입</Typography>
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
            required
            error={!!errors.email}
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
              required: "Required",
            })}
            required
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            label="활동명"
            inputRef={register({
              required: "Required",
            })}
            required
            error={!!errors.name}
            helperText="활동명을 입력해주세요"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="org"
            label="소속"
            inputRef={register({
              required: "Required",
            })}
            required
            error={!!errors.org}
            helperText="YWCA 회원이시면 소속을 표기해주세요. (예. OOYWCA)"
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
        <Box className={classes.label}>
          이미 회원이신가요?
          <Link to={`/login`} className={classes.link}>
            로그인
          </Link>
        </Box>
      </Container>
    </div>
  );
}
