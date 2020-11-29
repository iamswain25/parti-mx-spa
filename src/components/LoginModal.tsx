import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LoginForm from "./LoginForm";
import { useLoginModal } from "../store/useGlobalState";

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
  const classes = useStyles();
  function handleClose() {
    setVisible(false);
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
        <LoginForm />
      </div>
    </Modal>
  );
}
