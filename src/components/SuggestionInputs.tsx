import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import { TextField } from "@material-ui/core";
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { register, errors } = props.formControl;
  return (
    <>
      <CustomTextField
        label="제목"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="제보자"
        name="name"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="제보 내용"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="제보 사유"
        multiline
        name="context"
        register={register}
        errors={errors}
      />
      <TextField
        variant="outlined"
        margin="normal"
        name="password"
        label="글 수정 비밀번호"
        fullWidth
        inputRef={register({
          required: "필수 입력",
        })}
        required={errors.password ? true : false}
        error={errors.password ? true : false}
        helperText="글 수정 시 필요 함"
      />
    </>
  );
}
