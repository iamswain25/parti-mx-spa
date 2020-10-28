import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& a": {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <a
        href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        이용약관
      </a>
      Copyright ©
      <a href="https://www.sc.or.kr/" target="_blank" rel="noopener noreferrer">
        Save the Children Korea
      </a>
      All Rights Reserved.
    </footer>
  );
}
