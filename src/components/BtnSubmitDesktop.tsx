import React from "react";
import { Hidden, Button, makeStyles } from "@material-ui/core";
import useGoBack from "./useGoBack";
const useStyles = makeStyles((theme) => ({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& button": {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      width: "100%",
    },
  },
}));

export default function BtnSubmitDesktop({ text = "저장" }) {
  const classes = useStyles();
  const back = useGoBack();
  return (
    <Hidden smDown implementation="css">
      <div className={classes.btn}>
        <Button variant="outlined" color="secondary" onClick={back}>
          취소
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {text}
        </Button>
      </div>
    </Hidden>
  );
}
