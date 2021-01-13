import React from "react";
import CustomTextField from "./CustomTextField";
import { Controller, UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
import { suggestionOptions } from "../helpers/options";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { register, errors, control } = props.formControl;
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
      <Hashtags formControl={props.formControl} />
      <Controller
        control={control}
        name="metadata.location"
        defaultValue={{ address: "" }}
        render={({ value, onChange }) => (
          <GooglePlaceAutocomplete state={value} setState={onChange} />
        )}
      />
    </>
  );
}
