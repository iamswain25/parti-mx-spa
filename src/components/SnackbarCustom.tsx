import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function SnackbarCustom() {
  const [error, setError] = useGlobalState(keys.ERROR);

  function handleClose(
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!error}
      // autoHideDuration={6000}
      onClose={handleClose}
      message={JSON.stringify(error)}
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
    />
  );
}
