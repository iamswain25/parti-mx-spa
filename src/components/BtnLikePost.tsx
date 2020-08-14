import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useMutation } from "@apollo/client";
import { likePost } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useStore } from "../store/store";
import { Post } from "../types";
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
  const count = p.users_aggregate?.aggregate?.sum?.like_count || 0;
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [{ user_id }] = useStore();
  const [, showLogin] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [vote, { loading, error }] = useMutation(likePost, {
    variables: { id: p.id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler() {
    if (user_id) {
      await vote();
      switch (type) {
        // case "suggestion":
        //   return setSuccess("");
        // case "event":
        //   return setSuccess("참석 신청 하였습니다.");
        default:
          return setSuccess("liked");
      }
    } else {
      showLogin(true);
    }
  }
  const type = p.board?.type;
  switch (type) {
    case "suggestion":
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.like}
          disableElevation
        >
          제안 동의
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
          참석신청
        </Button>
      );
    default:
      return (
        <Button
          onClick={handler}
          variant="contained"
          className={classes.like}
          startIcon={<FavoriteIcon className={classes.icon} />}
          disableElevation
        >
          like {count}
        </Button>
      );
  }
}
