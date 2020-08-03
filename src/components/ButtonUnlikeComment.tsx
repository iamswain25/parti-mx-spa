import React from "react";
import { useMutation } from "@apollo/client";

import { unlikeComment } from "../graphql/mutation";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useStore } from "../store/store";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonUnlikeComment(props: {
  id: number;
  count: number;
}) {
  const classes = useStyles();
  const { id, count } = props;
  const [{ user_id }] = useStore();
  const [like, { loading, error }] = useMutation(unlikeComment, {
    variables: { comment_id: id, user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  function pressHandler() {
    like();
  }

  return (
    <Box alignItems="center" display="flex" color="primary.main">
      <Button className={classes.button} onClick={pressHandler}>
        공감취소
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count}
      </Box>
    </Box>
  );
}
