import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function SnackbarSuccess() {
  const [success, setSuccess] = useGlobalState(keys.SUCCESS);
  function handleClose(
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(null);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!success}
      autoHideDuration={1000}
      onClose={handleClose}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      <MuiAlert elevation={6} variant="filled" severity="success">
        {success}
      </MuiAlert>
    </Snackbar>
  );
}
