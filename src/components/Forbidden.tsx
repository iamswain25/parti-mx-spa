import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useStore } from "../store/store";
import useGroupJoin from "./useGroupJoin";
import useLogin from "./useLogin";

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      margin: 10,
      padding: 0,
      border: "none",
      background: "none",
      fontSize: "inherit",
      color: theme.palette.primary.main,
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
export default function Forbidden() {
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const joinHandler = useGroupJoin();
  const [login, signup] = useLogin();
  return (
    <Typography variant="h1">
      <div className={classes.div}>
        {!user_id ? (
          <>
            <button onClick={login}>로그인</button>또는
            <button onClick={signup}>회원가입</button>을 해주세요
          </>
        ) : (
          <>
            <button onClick={joinHandler}>그룹가입</button>을 해주세요
          </>
        )}
      </div>
    </Typography>
  );
}
