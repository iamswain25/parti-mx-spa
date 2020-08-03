import React from "react";
import { useMutation } from "@apollo/client";

import { likeComment } from "../graphql/mutation";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useStore } from "../store/store";
import { useGlobalState, keys } from "../store/useGlobalState";
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
  },
}));
export default function ButtonLikeComment(props: {
  id?: number;
  count?: number;
}) {
  const classes = useStyles();
  const [{ user_id }] = useStore();
  const [, showLogin] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const { id, count } = props;
  const [like, { loading, error }] = useMutation(likeComment, {
    variables: { comment_id: id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  function pressHandler() {
    if (user_id) {
      like();
    } else {
      showLogin(true);
    }
  }

  return (
    <Box alignItems="center" display="flex">
      <Button className={classes.button} onClick={pressHandler}>
        공감
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count}
      </Box>
    </Box>
  );
}
