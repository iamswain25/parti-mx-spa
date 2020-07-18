import React from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
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
    fontSize: 12,
    letterSpacing: -0.33,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
    borderStyle: "solid",
  },
}));
export default function BtnUnlikePost({ post }: { post?: Post }) {
  const classes = useStyles();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [{ user_id }] = useStore();
  const count = post?.users_aggregate?.aggregate?.sum?.like_count || 0;
  const [unlike, { loading, error }] = useMutation(unlikePost, {
    variables: { id: post?.id, user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler() {
    await unlike();
    setSuccess("공감 취소 하였습니다.");
  }
  return (
    <Box>
      <Button
        onClick={handler}
        variant="contained"
        className={classes.like}
        startIcon={<FavoriteIcon className={classes.icon} />}
      >
        공감취소 {count}
      </Button>
    </Box>
  );
}
