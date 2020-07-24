import React from "react";
import CustomTextField from "./CustomTextField";
import { suggestionOptions } from "../helpers/options";

export default function SuggestionInputs(formControl: any) {
  const { register, errors } = formControl;
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
        select
        label="제안 종료 방법"
        variant="filled"
        name="closingMethod"
        SelectProps={{ native: true }}
        defaultValue="30days"
        children={suggestionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      />
      <CustomTextField
        label="내용"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
    </>
  );
}
