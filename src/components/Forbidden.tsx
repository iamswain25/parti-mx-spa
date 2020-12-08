import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import useGroupJoin from "./useGroupJoin";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import { useCurrentUser, useGroupId } from "../store/useGlobalState";
import createGroup from "../helpers/createGroup";

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&>a": {
      textDecoration: "underline",
    },
  },
}));
export default function Forbidden({
  noPost = false,
  noBoard = false,
  noGroup = false,
  notAdmin = false,
}: {
  noPost?: boolean;
  noBoard?: boolean;
  noGroup?: boolean;
  notAdmin?: boolean;
}) {
  const [group_id] = useGroupId();
  const [currentUser] = useCurrentUser();
  const classes = useStyles();
  const joinHandler = useGroupJoin();
  const [login, signup] = useLogin();
  if (notAdmin) {
    return (
      <div className={classes.link}>
        운영자 권한이 없습니다. <br />
        운영자에게 운영자 권한을 요청하세요. <br />
        <Link to="/">이전 그룹의 메인화면으로 돌아갑니다.</Link>
      </div>
    );
  }
  if (noPost) {
    return (
      <div className={classes.link}>
        삭제된 게시물입니다. <br />
        <Link to="/">이전 그룹의 메인화면으로 돌아갑니다.</Link>
      </div>
    );
  }
  if (noBoard) {
    return (
      <div className={classes.link}>
        삭제된 게시판입니다. <br />
        <Link to="/">이전 그룹의 메인화면으로 돌아갑니다.</Link>
      </div>
    );
  }
  if (noGroup) {
    return (
      <div className={classes.link}>
        삭제 되었거나 없는 그룹입니다. <br />
        <Link to="/home">홈 그룹으로 돌아갑니다.</Link>
        <Box mt={2}>
          {currentUser?.email && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => createGroup(group_id)}
            >
              그룹을 생성합니다.
            </Button>
          )}
        </Box>
      </div>
    );
  }
  return (
    <Typography variant="h1">
      <div className={classes.div}>
        {!currentUser?.email ? (
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
