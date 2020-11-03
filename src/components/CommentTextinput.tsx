import React from "react";
import { TextField, makeStyles, Button, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useCurrentUser, useLoginModal } from "../store/useGlobalState";
import { Comment, CommentInput } from "../types";
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
  comment: Comment;
  user?: string;
  autoFocus?: boolean;
  handler: any;
}) {
  const atUser = user ? `@${user} ` : "";
  const { password } = comment;
  const parent_id = comment.id || null;
  const post_id = comment.post_id || null;
  const { handleSubmit, register, errors, reset, getValues } = useForm<
    CommentInput
  >({
    defaultValues: { body: atUser, parent_id, post_id, password },
  });
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const [, setVisible] = useLoginModal();
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const { body } = getValues();
    if (body.indexOf(atUser) < 0) {
      reset({ body: atUser + body, parent_id, post_id, password });
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
          fullWidth
          disabled={!userId}
          label="댓글 입력"
          name="body"
          classes={{ root: classes.root }}
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
        <Grid container justify="flex-end" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            label="댓글 수정 비밀번호"
            inputRef={register({
              required: "필수 입력",
              pattern: /[0-9]/,
              maxLength: 4,
              minLength: 4,
            })}
            required={errors.password ? true : false}
            error={errors.password ? true : false}
            helperText="숫자 4자리를 입력하세요"
          />
          <div style={{ marginLeft: 10 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              등록
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
}
