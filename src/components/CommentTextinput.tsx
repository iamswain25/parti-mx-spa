import React from "react";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useStore } from "../store/store";
import { useGlobalState, keys } from "../store/useGlobalState";
import { User, Comment, CommentInput } from "../types";

export default function CommentTextinput({
  comment,
  user,
  autoFocus = false,
  handler,
}: {
  comment?: Comment;
  user?: User;
  autoFocus?: boolean;
  handler: any;
}) {
  const atUser = user ? `@${user?.name} ` : "";
  const parent_id = comment?.id || null;
  const post_id = comment?.post?.id || null;
  const { handleSubmit, register, errors, reset } = useForm<CommentInput>({
    defaultValues: { body: atUser, parent_id, post_id },
  });
  const [{ user_id }] = useStore();
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    reset({ body: atUser, parent_id, post_id });
    ref.current?.focus();
  }, [reset, atUser, parent_id, post_id]);

  function loginHandler() {
    if (!user_id) {
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
          fullWidth
          disabled={!user_id}
          label="댓글"
          name="body"
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
      </form>
    </>
  );
}
