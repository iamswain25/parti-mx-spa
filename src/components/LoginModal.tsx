import React from "react";
import { FormData } from "../types";
import { auth } from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LoginForm from "./LoginForm";
import { loginError } from "../helpers/firebaseErrorCode";
import { useError, useLoginModal } from "../store/useGlobalState";

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
  const [isVisible, setVisible] = useLoginModal();
  const [, setError] = useError();
  const classes = useStyles();
  function handleClose() {
    setVisible(false);
  }
  async function handleForm(form: FormData) {
    const { email, password } = form;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      handleClose();
      // @ts-ignore
      wsLink.subscriptionClient.close(false);
      // window.location.reload();
    } catch (error) {
      loginError(error, setError);
    }
  }
  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <LoginForm handleForm={handleForm} />
      </div>
    </Modal>
  );
}
