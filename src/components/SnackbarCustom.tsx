import React from "react";
import { Snackbar, IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStore } from "../store/store";
export default function SnackbarCustom() {
  const [{ error }] = useStore();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  function handleClose(
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      // autoHideDuration={6000}
      onClose={handleClose}
      message={JSON.stringify(error)}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
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
