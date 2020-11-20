import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
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
        label="소개영상"
        name="metadata.youtube"
        register={register}
        errors={errors}
        helperText="유튜브 링크 주소를 넣어주세요. 예: https://youtu.be/GaWVFHEvpNI"
      />
      <CustomTextField
        label="단체명 * 단체소개"
        multiline
        name="context"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="요약"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="심사평"
        multiline
        name="metadata.detail1"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="일반현황"
        multiline
        name="metadata.detail2"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="대표사례"
        multiline
        name="metadata.detail3"
        register={register}
        errors={errors}
      />
      <Hashtags formControl={props.formControl} />
    </>
  );
}
