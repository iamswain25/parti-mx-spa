import React from "react";
import { Hidden, Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  btn: {
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      width: "100%",
    },
  },
}));

export default function BtnSubmitDesktop({ text = "투표 제출" }) {
  const classes = useStyles();
  return (
    <Hidden smDown implementation="css">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.btn}
      >
        {text}
      </Button>
    </Hidden>
  );
}
