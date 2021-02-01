import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import { suggestionOptions } from "../helpers/options";
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
        label="제안 배경"
        multiline
        name="context"
        register={register}
        errors={errors}
      />
      <CustomTextField
        register={register}
        errors={errors}
        select
        SelectProps={{ native: true }}
        label="제안 종료 방법"
        variant="filled"
        name="metadata.closingMethod"
        defaultValue="7days"
        children={suggestionOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      />
      <CustomTextField
        label="제안 내용"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
    </>
  );
}
