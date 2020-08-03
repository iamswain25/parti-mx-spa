import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useMutation } from "@apollo/client";
import { unlikePost } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useStore } from "../store/store";
import { Post } from "../types";
const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    color: theme.palette.primary.main,
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
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
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
    // color: theme.palette.common.white,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
  },
}));
export default function BtnUnlikePost({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [{ user_id }] = useStore();
  const count = p.users_aggregate?.aggregate?.sum?.like_count || 0;
  const [unlike, { loading, error }] = useMutation(unlikePost, {
    variables: { id: p.id, user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const type = p.board?.type;
  async function handler() {
    await unlike();
    switch (type) {
      case "suggestion":
        return setSuccess("제안 취소 하였습니다.");
      case "event":
        return setSuccess("참석 취소 하였습니다.");
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
          제안 동의 취소
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
          참석 취소
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
          공감 취소 {count}
        </Button>
      );
  }
}
