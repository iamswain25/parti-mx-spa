import React from "react";
import { FormData } from "../types";
import { auth, firestore } from "../config/firebase";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Typography,
  Container,
  Box,
  LinearProgress,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser, useError } from "../store/useGlobalState";
import firebase from "firebase";
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
  },
  label: {
    fontSize: 12,
    letterSpacing: -0.55,
    color: "#212121",
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(3),
    marginLeft: 0,
    "& a": {
      textDecoration: "underline",
    },
  },
}));
export default function Signup() {
  useRedirectIfLogin();
  const classes = useStyles();
  const [, setError] = useError();
  const [, setCurrentUser] = useCurrentUser();
  const history = useHistory<{ from: { pathname: string } }>();
  const { from } = history.location.state ?? { from: "/" };
  const {
    handleSubmit,
    register,
    errors,
    formState,
    control,
  } = useForm<FormData>();
  async function formHandler(form: FormData) {
    const { email, password, name } = form;

    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      const userCred = await auth.currentUser?.linkWithCredential(credential);
      if (userCred && userCred.user) {
        const p1 = firestore.doc(`groups/home/users/${userCred.user.uid}`).set(
          {
            created_at: new Date(),
            role: "user",
          },
          { merge: true }
        );
        const p2 = userCred.user.updateProfile({ displayName: name });
        const p3 = firestore.doc(`users/${userCred.user.uid}`).set(
          {
            name,
            email,
            updated_at: new Date(),
            term_privacy: new Date(),
            term_service: new Date(),
          },
          { merge: true }
        );
        await Promise.all([p1, p2, p3]);
        alert("회원가입 되었습니다.");
        setCurrentUser({ ...userCred.user } as firebase.User);
        history.replace(from);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      {formState.isSubmitting && <LinearProgress />}
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
              required={!!errors.email}
              error={!!errors.email}
              helperText={errors?.email?.message}
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
              required={!!errors.password}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="name"
              label="닉네임"
              inputRef={register({
                required: "Required",
                validate: async (value: string) => {
                  const res = await firestore
                    .collection("users")
                    .where("name", "==", value)
                    .get();
                  if (!res.empty) {
                    return "이미 사용 중인 닉네임입니다.";
                  }
                },
              })}
              required={!!errors.name}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <FormControl
              required
              error={Boolean(errors.term_privacy || errors.term_service)}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend">
                아래 링크에 동의해주세요.
              </FormLabel>
              <FormGroup>
                <Controller
                  name="term_service"
                  rules={{ required: "필수" }}
                  control={control}
                  defaultValue={false}
                  render={({ onChange, value, ...rest }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...rest}
                          color="primary"
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                        />
                      }
                      label={
                        <a
                          href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          이용약관
                        </a>
                      }
                    />
                  )}
                />
                <Controller
                  name="term_privacy"
                  rules={{ required: "필수" }}
                  control={control}
                  defaultValue={false}
                  render={({ onChange, value, ...rest }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...rest}
                          color="primary"
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                        />
                      }
                      label={
                        <a
                          href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          개인정보 처리방침
                        </a>
                      }
                    />
                  )}
                />
              </FormGroup>
              <FormHelperText>모두 체크하셔야 가입 가능합니다.</FormHelperText>
            </FormControl>
            <div className={classes.wrapper}>
              <Button
                disabled={formState.isSubmitting}
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
    </>
  );
}
