import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Tags from "./Tags";
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
  children?: React.ReactNode;
}) {
  const { register, errors } = props.formControl;
  return (
    <>
      <CustomTextField
        label="My question :: 나의 질문"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="Description (Question & Image) :: 설명"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <Tags formControl={props.formControl} />
    </>
  );
}
