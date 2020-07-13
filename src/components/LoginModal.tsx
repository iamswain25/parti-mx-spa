import React from "react";
import { FormData } from "../types";
import { auth } from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { useGlobalState, keys } from "../store/useGlobalState";
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
}));

export default function LoginModal() {
  const [isVisible, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [, setError] = useGlobalState(keys.ERROR);
  const classes = useStyles();
  const history = useHistory();
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
    history.push("/signup");
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
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={signupHandler}
        >
          회원가입
        </Button>
      </div>
    </Modal>
  );
}
