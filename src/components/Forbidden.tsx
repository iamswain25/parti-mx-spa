import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Forbidden() {
  const classes = useStyles();
  return <div className={classes.div}>비공개 게시물 입니다.</div>;
}
