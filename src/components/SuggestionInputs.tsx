import React from "react";
import CustomTextField from "./CustomTextField";
import { closingOptions } from "../helpers/options";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
  children?: React.ReactNode;
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
        select
        label="제안 종료 방법"
        variant="filled"
        name="closingMethod"
        SelectProps={{ native: true }}
        defaultValue="manual"
        register={register}
        errors={errors}
        children={closingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      />
      {props.children ? (
        props.children
      ) : (
        <CustomTextField
          label="내용"
          multiline
          name="body"
          register={register}
          errors={errors}
        />
      )}
      <Hashtags formControl={props.formControl} />
    </>
  );
}
