import React from "react";
import { SignupForm } from "../types";
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
import CountryRegionLocal from "./CountryRegionLocal";
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
    const { email, password, name, country, region, local } = form;
    setLoading(true);
    try {
      updateUser = (user_id: number) => {
        const metadata = { country, region, local };
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
        <Typography variant="h2">Register</Typography>
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
            label="E-mail address"
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
            required={errors.password ? true : false}
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />
          <CountryRegionLocal formControl={formControl} />
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
          Already a member?
          <Link to={`/login`} className={classes.link}>
            Log-in
          </Link>
        </Box>
      </Container>
    </div>
  );
}
