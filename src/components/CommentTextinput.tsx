import React from "react";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useStore } from "../store/store";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function CommentTextinput({
  post_id,
  comment_id,
  body = "",
  autoFocus = false,
}: {
  post_id?: number;
  comment_id?: number | null;
  body?: string;
  autoFocus?: boolean;
}) {
  const { handleSubmit, register, errors, reset } = useForm<{ body: string }>({
    defaultValues: { body },
  });
  const [{ user_id }] = useStore();
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const ref = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    reset({ body });
    ref.current?.focus();
  }, [body, comment_id, reset]);
  function formHandler() {}
  function loginHandler() {
    console.log(user_id);
    if (!user_id) {
      setVisible(true);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(formHandler)} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          disabled={!user_id}
          label="댓글"
          name="body"
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
