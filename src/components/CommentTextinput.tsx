import React from "react";
import { TextField, makeStyles, Button, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useGlobalState, keys, useCurrentUser } from "../store/useGlobalState";
import { User, Comment, CommentInput } from "../types";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 0,
        "&.Mui-focused textarea": {
          [theme.breakpoints.down("sm")]: {
            minHeight: 142,
          },
        },
      },
    },
    btn: {
      backgroundColor: theme.palette.primary.dark,
    },
  };
});
export default function CommentTextinput({
  comment,
  user,
  autoFocus = false,
  handler,
}: {
  comment?: Comment;
  user?: string;
  autoFocus?: boolean;
  handler: any;
}) {
  const atUser = user ? `@${user} ` : "";
  const parent_id = comment?.id || null;
  const post_id = comment?.post_id || null;
  const { handleSubmit, register, errors, reset, getValues } = useForm<
    CommentInput
  >({
    defaultValues: { body: atUser, parent_id, post_id },
  });
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const { body } = getValues();
    if (body.indexOf(atUser) < 0) {
      reset({ body: atUser + body, parent_id, post_id });
    }
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [reset, atUser, parent_id, post_id, getValues, autoFocus]);

  function loginHandler() {
    if (!userId) {
      setVisible(true);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handler)} noValidate autoComplete="off">
        <input type="hidden" ref={register} name="post_id" />
        <input type="hidden" ref={register} name="parent_id" />
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          // rows={4}
          fullWidth
          disabled={!userId}
          label="댓글 입력"
          name="body"
          classes={{ root: classes.root }}
          // autoComplete="off"
          onClick={loginHandler}
          autoFocus={autoFocus}
          inputRef={(r) => {
            ref.current = r;
            register(r, {
              required: "댓글을 입력하세요",
            });
          }}
          required={errors.body ? true : false}
          error={errors.body ? true : false}
        />
        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            등록
          </Button>
        </Grid>
      </form>
    </>
  );
}
