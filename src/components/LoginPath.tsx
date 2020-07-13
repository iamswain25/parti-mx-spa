import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import Button from "@material-ui/core/Button";
import { useStore } from "../store/store";
import Modal from "@material-ui/core/Modal";
export default function LoginPath() {
  const [{ user_id }] = useStore();
  const [isVisible, setVisible] = React.useState(false);
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/login");
  };
  const handleLogin = () => {
    history.push("/login");
  };
  function handleClose() {
    setVisible(false);
  }
  return (
    <>
      {user_id ? (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      )}
      <Modal
        open={isVisible}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>ok</div>
      </Modal>
    </>
  );
}
