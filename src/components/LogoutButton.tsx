import React from "react";
import { auth } from "../config/firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
    fontWeight: 500
  },
}));

export default function LogoutButton() {
  async function logoutHandler() {
    await auth.signOut();
    // history.replace("/");
  }
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen} color="inherit" className={classes.root}>
        로그아웃
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            로그아웃 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            아니요
          </Button>
          <Button onClick={logoutHandler} color="primary" autoFocus>
            네, 로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
