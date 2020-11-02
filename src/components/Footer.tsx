import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    "& a": {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    "& div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div>
        Copyright ©
        <a href="https://ywca.or.kr/" target="_blank" rel="noopener noreferrer">
          한국YWCA연합회
        </a>
        All Rights Reserved.
      </div>
      <div>
        <a
          href="mailto:peacenow@ywca.or.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          email: peacenow@ywca.or.kr
        </a>
      </div>
      <div>주소 : 04538 서울시 중구 명동길 73(명동 1가)</div>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          이용약관
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer">
          개인정보취급방침
        </a>
      </div>
    </footer>
  );
}
