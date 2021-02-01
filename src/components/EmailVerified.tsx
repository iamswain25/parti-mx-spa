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
import { useGroupId } from "../store/useGlobalState";
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
  const [group_id] = useGroupId();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isVerified === undefined) {
    return <LinearProgress />;
  }
  if (auth.currentUser?.isAnonymous || isVerified) {
    history.replace(`/${group_id}`);
  }
  return (
    <Box className={classes.div}>
      {!isVerified && (
        <Typography variant="h1" color="primary">
          이메일 인증을 완료해주세요.
          <Link to={`${group_id}`}>
            <Button color="primary" onClick={sendVerificationEmail}>
              인증 이메일 재발송
            </Button>
          </Link>
        </Typography>
      )}
    </Box>
  );
}
