import React from "react";
import { Controller, UseFormMethods } from "react-hook-form";
import { NoticeFormdata } from "../types";
import CustomTextField from "./CustomTextField";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import Hashtags from "./Hashtags";
import HtmlInput from "./HtmlInput";

export default function NoticeInput(props: {
  formControl: UseFormMethods<NoticeFormdata>;
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
      <Hashtags formControl={props.formControl} />
      <HtmlInput formControl={props.formControl} />
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
