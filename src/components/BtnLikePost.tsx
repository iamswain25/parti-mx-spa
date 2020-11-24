import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  useCurrentUser,
  useSuccess,
  useLoginModal,
} from "../store/useGlobalState";
import { Post } from "../types";
import { firestore } from "../config/firebase";
import usePermission from "../store/usePermission";
const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  like: {
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      width: "100%",
    },
    letterSpacing: -0.33,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: "solid",
  },
  event: {
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      width: "100%",
    },
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));
export default function BtnLikePost({ post: p }: { post: Post }) {
  const classes = useStyles();
  const count = 0;
  const [, setSuccess] = useSuccess();
  const [currentUser] = useCurrentUser();
  const [hasPermission, showAlert] = usePermission("like");
  async function handler() {
    if (!hasPermission) {
      return showAlert();
    }
    await firestore
      .collection("posts")
      .doc(p.id)
      .collection("likes")
      .doc(currentUser?.uid)
      .set({ created_at: new Date() }, { merge: true });
    setSuccess("공감 하였습니다.");
  }
  const type = p.type;
  switch (type) {
    case "suggestion":
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.like}
          disableElevation
          // disabled={!hasPermission}
        >
          응원해요
        </Button>
      );
    case "event":
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.event}
          disableElevation
          // disabled={!hasPermission}
        >
          공감신청
        </Button>
      );
    default:
      return (
        <Button
          onClick={handler}
          variant="contained"
          // disabled={!hasPermission}
          className={classes.like}
          startIcon={<FavoriteIcon className={classes.icon} />}
          disableElevation
        >
          공감 {count}
        </Button>
      );
  }
}
