import React from "react";
import { useMutation } from "@apollo/client";

import { likeComment } from "../graphql/mutation";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
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
  const { id, count } = props;
  const [like, { loading, error }] = useMutation(likeComment, {
    variables: { comment_id: id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  function pressHandler() {
    like();
  }

  return (
    <Box alignItems="center" display="flex" ml={1}>
      <Button className={classes.button} onClick={pressHandler}>
        공감
      </Button>
      <Box ml={0.5} alignItems="center" display="flex">
        {count}
      </Box>
    </Box>
  );
}
