import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    "& a": {
      // "&:first-child": {
      //   marginLeft: theme.spacing(0),
      // },
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    "& div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // justifyContent: "flex-start",
      "&.bold": {
        fontWeight: "bold",
        marginTop: theme.spacing(3),
      },
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <hr />
      <footer className={classes.root}>
        <div>
          <a
            href="https://drive.google.com/file/d/186Z20DrfN0ZpqPpqRSFCmZThoZtSchLI/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            이용약관
          </a>
          <a
            href="https://drive.google.com/file/d/1usKlFDL3dW6U6h0o5Xc_WrYfIWXqYcOp/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            개인정보취급방침
          </a>
        </div>
        <div>서울특별시 중구 명동길 73(명동 1가)</div>
        <div>TEL 02-774-9702-7 | FAX 02-774-9724</div>
        <div>
          <a
            href="mailto:peacenow@ywca.or.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            이메일 peacenow@ywca.or.kr
          </a>
        </div>
        <div className="bold">
          Copyright 2020
          <a
            href="https://ywca.or.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            한국YWCA연합회
          </a>
          All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
