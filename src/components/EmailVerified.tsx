import React, { useEffect } from "react";
import { auth, firestore } from "../config/firebase";
import {
  Box,
  LinearProgress,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { sendVerificationEmail } from "../helpers/emailVerification";
const useStyles = makeStyles(theme => ({
  div: {
    marginTop: theme.spacing(10),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& button,  & button:hover": {
      marginTop: theme.spacing(10),
      padding: theme.spacing(4),
      fontSize: "inherit",
      textDecoration: "underline",
    },
  },
}));

export default function EmailVerified() {
  const classes = useStyles();
  const history = useHistory();
  const isVerified = auth.currentUser?.emailVerified;

  async function updateVerificationInfo() {
    if (isVerified) {
      await firestore.doc(`users/${auth.currentUser?.uid}`).update({
        verified: isVerified,
      });
    }
  }
  useEffect(() => {
    updateVerificationInfo();
  }, []);
  if (isVerified === undefined) {
    return <LinearProgress />;
  }
  if (auth.currentUser?.isAnonymous) {
    history.replace("/");
  }
  return (
    <Box className={classes.div}>
      {isVerified ? (
        <Typography variant="h1" color="primary">
          이메일 인증이 완료되었습니다.
          <Link to="/">
            <Button color="primary">홈화면으로 돌아가기</Button>
          </Link>
        </Typography>
      ) : (
        <Typography variant="h1" color="primary">
          이메일 인증을 완료해주세요.
          <Link to="/">
            <Button color="primary" onClick={sendVerificationEmail}>
              인증 이메일 재발송
            </Button>
          </Link>
        </Typography>
      )}
    </Box>
  );
}
