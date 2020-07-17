import React from "react";
import { FormData } from "../types";
import { auth } from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { useGlobalState, keys } from "../store/useGlobalState";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  label: {
    fontSize: 12,
    letterSpacing: -0.55,
    color: "#212121",
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  link: {
    marginLeft: theme.spacing(1),
    color: "#002bff",
  },
}));

export default function LoginModal() {
  const [isVisible, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [, setError] = useGlobalState(keys.ERROR);
  const classes = useStyles();
  function handleClose() {
    setVisible(false);
  }
  async function handleForm(form: FormData) {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      handleClose();
    } catch (error) {
      setError(error);
    }
  }
  function signupHandler() {
    handleClose();
  }
  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <LoginForm handleForm={handleForm} />
        <Box className={classes.label}>
          아직 회원이 아니신가요?
          <Link to={`/signup`} onClick={signupHandler} className={classes.link}>
            회원가입
          </Link>
        </Box>
      </div>
    </Modal>
  );
}
