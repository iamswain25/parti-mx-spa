import React from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useMutation } from "@apollo/client";
import { likePost } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useStore } from "../store/store";
const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  like: {
    fontSize: 12,
    letterSpacing: -0.33,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: "solid",
  },
}));
export default function BtnLikePost({
  count = 0,
  id,
}: {
  count?: number;
  id?: number;
}) {
  const classes = useStyles();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [{ user_id }] = useStore();
  const [, showLogin] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [vote, { loading, error }] = useMutation(likePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function voteHandler() {
    if (user_id) {
      await vote();
      setSuccess("공감하였습니다.");
    } else {
      showLogin(true);
    }
  }
  return (
    <Box>
      <Button
        onClick={voteHandler}
        variant="contained"
        className={classes.like}
        startIcon={<FavoriteIcon className={classes.icon} />}
      >
        공감 {count}
      </Button>
    </Box>
  );
}
