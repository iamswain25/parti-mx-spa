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
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import useRedirectIfLogin from "./useRedirectIfLogin";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
import firebase from "firebase";
import { loginError } from "../helpers/firebaseErrorCode";
import UserExtraInfo from "./UserExtraInfo";
const useStyles = makeStyles(theme => ({
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
  error: {
    color: theme.palette.error.main,
    whiteSpace: "break-spaces",
  },
}));
export default function Signup() {
  useRedirectIfLogin();
  const classes = useStyles();
  const [error, setError] = React.useState(undefined);
  const [, setCurrentUser] = useCurrentUser();
  const history = useHistory<{ from: { pathname: string } }>();
  const { from } = history.location.state ?? { from: "/" };
  const formControl = useForm<FormData>({
    defaultValues: { area: "서울특별시" },
  });
  const { handleSubmit, register, errors, formState, control } = formControl;
  async function formHandler(form: FormData) {
    const { email, password, name, ...rest } = form;

    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password,
      );
      const userCred = await auth.currentUser?.linkWithCredential(credential);
      if (userCred && userCred.user) {
        const p1 = firestore.doc(`groups/home/users/${userCred.user.uid}`).set(
          {
            created_at: new Date(),
            role: "user",
          },
          { merge: true },
        );
        const p2 = userCred.user.updateProfile({ displayName: name });
        const p3 = firestore.doc(`users/${userCred.user.uid}`).set(
          {
            ...rest,
            name,
            email,
            updated_at: new Date(),
            term_privacy: new Date(),
            term_service: new Date(),
          },
          { merge: true },
        );
        await Promise.all([p1, p2, p3]);
        alert("회원가입 되었습니다.");
        setCurrentUser({ ...userCred.user } as firebase.User);
        history.replace(from);
      }
    } catch (error) {
      loginError(error, setError);
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
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "올바른 이메일 주소를 입력하세요.",
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
                required: "필수 입력 항목입니다.",
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
                required: "필수 입력 항목입니다.",
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
            <UserExtraInfo formControl={formControl} />
            <FormControl
              required
              error={Boolean(errors.term_privacy || errors.term_service)}
              component="fieldset"
              className={classes.formControl}
            >
              <FormGroup>
                <Controller
                  name="term_service"
                  rules={{ required: "필수 입력 항목입니다." }}
                  control={control}
                  defaultValue={false}
                  render={({ onChange, value, ...rest }) => (
                    <FormControlLabel
                      control={
                        <>
                          <Checkbox
                            {...rest}
                            color="primary"
                            onChange={e => onChange(e.target.checked)}
                            checked={value}
                          />
                          이용약관 동의 (필수)
                        </>
                      }
                      label={
                        <a
                          href="https://docs.google.com/file/d/1HH1hSBgpl2tX266EfsjsUJvs7KAL_lctZKJnGAsTCNE/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          내용보기
                        </a>
                      }
                    />
                  )}
                />
                <Controller
                  name="term_privacy"
                  rules={{ required: "필수 입력 항목입니다." }}
                  control={control}
                  defaultValue={false}
                  render={({ onChange, value, ...rest }) => (
                    <FormControlLabel
                      control={
                        <>
                          <Checkbox
                            {...rest}
                            color="primary"
                            onChange={e => onChange(e.target.checked)}
                            checked={value}
                          />
                          개인정보 처리방침 동의 (필수)
                        </>
                      }
                      label={
                        <a
                          href="https://docs.google.com/file/d/11FSUnqoNijw9yGbgQCT38_fKrYS0tyTTYOOfLCVBbX8/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          내용보기
                        </a>
                      }
                    />
                  )}
                />
              </FormGroup>
              {(errors?.term_privacy?.message ||
                errors?.term_service?.message) && (
                <FormHelperText>약관에 모두 동의하셔야 합니다.</FormHelperText>
              )}
            </FormControl>
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
