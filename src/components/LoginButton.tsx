import React from "react";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLoginModal } from "../store/useGlobalState";
const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
    fontWeight: 500
  },
}));
export default function LoginButton() {
  const [, setVisible] = useLoginModal();
  const classes = useStyles();

  function handleLogin() {
    setVisible(true);
  }
  return (
    <MenuItem onClick={handleLogin} color="inherit" className={classes.root}>
      로그인
    </MenuItem>
  );
}
