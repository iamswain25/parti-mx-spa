import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { Post } from "../types";
import { firestore } from "../config/firebase";
import usePostCounter from "../store/usePostCounter";
import usePermission from "../store/usePermission";
const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    color: theme.palette.common.white,
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
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    borderColor: "#bbe7d6", // theme.palette.primary.main,
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
    // backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    // color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
  },
}));
export default function BtnUnlikePost({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [, setSuccess] = useSuccess();
  const [currentUser] = useCurrentUser();
  const [counter] = usePostCounter(p.id);
  const { count_like = 0 } = counter || {};
  const [hasPermission, showAlert] = usePermission("like");
  const type = p.type;
  async function handler() {
    if (!hasPermission) {
      return showAlert();
    }
    await firestore
      .collection("posts")
      .doc(p.id)
      .collection("likes")
      .doc(currentUser?.uid)
      .delete();
    switch (type) {
      case "suggestion":
        return setSuccess("응원 취소 하였습니다.");
      case "event":
        return setSuccess("공감 취소 하였습니다.");
      default:
        return setSuccess("공감 취소 하였습니다.");
    }
  }
  switch (type) {
    case "suggestion":
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.like}
          disableElevation
        >
          응원해요 취소
        </Button>
      );
    case "event":
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.event}
          disableElevation
        >
          공감 취소
        </Button>
      );
    default:
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.like}
          disableElevation
          startIcon={<FavoriteIcon className={classes.icon} />}
        >
          공감 취소 {count_like}
        </Button>
      );
  }
}
