import React from "react";
import { UseFormMethods } from "react-hook-form";
import { NoticeFormdata } from "../types";
import CustomTextField from "./CustomTextField";
import HtmlInput from "./HtmlInput";

export default function NoticeInput(props: {
  formControl: UseFormMethods<NoticeFormdata>;
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
      <HtmlInput formControl={props.formControl} />
    </>
  );
}
