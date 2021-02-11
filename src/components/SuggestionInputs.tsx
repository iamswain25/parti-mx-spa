import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods, Controller } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import { suggestionOptions } from "../helpers/options";
import Tags from "./Tags";
import Hashtags from "./Hashtags";
import HtmlInput from "./HtmlInput";
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
      <HtmlInput formControl={props.formControl} />
      <Tags formControl={props.formControl} />
      <Hashtags formControl={props.formControl} />
      <Controller
        control={control}
        name="metadata.location"
        defaultValue={{ address: "" }}
        render={({ value, onChange }) => (
          <GooglePlaceAutocomplete state={value} setState={onChange} />
        )}
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
    </>
  );
}
