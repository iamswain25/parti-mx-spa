import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useStore } from "../store/store";
import Modal from "@material-ui/core/Modal";
export default function LoginPath() {
  const [{ user_id, loading, isInit }] = useStore();
  const [isVisible, setVisible] = React.useState(false);
  const theme = useTheme();
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
      {user_id === null ? (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLogout}>
          Logout
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
