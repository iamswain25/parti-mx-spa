import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
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
        label="전시자"
        name="name"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="전시 내용"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="전시 사유"
        multiline
        name="context"
        register={register}
        errors={errors}
      />
    </>
  );
}
