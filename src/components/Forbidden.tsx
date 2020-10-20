import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useStore } from "../store/store";
import useGroupJoin from "./useGroupJoin";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";

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
  link: {
    marginTop: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));
export default function Forbidden({ noPost = false }: { noPost?: boolean }) {
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const joinHandler = useGroupJoin();
  const [login, signup] = useLogin();
  if (noPost) {
    return (
      <div className={classes.link}>
        <Link to="/">
          삭제된 게시물입니다. <br />
          이전 그룹의 메인화면으로 돌아갑니다.
        </Link>
      </div>
    );
  }
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
