import React from "react";
import { Comment } from "../types";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import useCommentUpdate from "./useCommentUpdate";
type CommentForm = { body: string };
export default function CommentEdit({
  c,
  setEdit,
}: {
  c: Comment;
  setEdit: (edit: boolean) => void;
}) {
  const update = useCommentUpdate(c.id);
  const { handleSubmit, register, errors } = useForm<CommentForm>();
  async function handleForm(form: CommentForm) {
    await update(form.body);
    setEdit(false);
  }
  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={c.body}
        name="body"
        inputRef={register({ required: "수정 할 댓글을 입력하세요." })}
        required
        error={!!errors.body}
        helperText={errors.body && errors.body.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="text" onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                수정
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
