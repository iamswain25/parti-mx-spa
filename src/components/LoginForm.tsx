import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { FormData } from "../types";
import { useGlobalState, keys } from "../store/useGlobalState";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  },
  labelContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

type LoginFormProps = {
  handleForm: (form: FormData) => void;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ handleForm }) => {
  const classes = useStyles();
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const { handleSubmit, register, errors } = useForm<FormData>();
  function closeLoginModal() {
    setVisible(false);
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h2">Log-in</Typography>
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
            label="E-mail address"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            className={classes.submit}
          >
            Log-in
          </Button>
        </form>
        <div className={classes.labelContainer}>
          <Box className={classes.label}>
            Not a member yet?
            <Link
              to={`/signup`}
              onClick={closeLoginModal}
              className={classes.link}
            >
              Register
            </Link>
          </Box>
          <Box className={classes.label}>
            Forgot password?
            <Link
              to={`/forgot`}
              onClick={closeLoginModal}
              className={classes.link}
            >
              Find Password
            </Link>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
