import React from "react";
import CustomTextField from "./CustomTextField";
import { getDatetimeFormat } from "../helpers/datefns";
import HtmlInput from "./HtmlInput";
import Hashtags from "./Hashtags";
import Tags from "./Tags";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import { Controller, UseFormMethods } from "react-hook-form";
import { EventFormdata } from "../types";
const now = getDatetimeFormat(new Date());
export default function EventInputs(props: {
  formControl: UseFormMethods<EventFormdata>;
}) {
  const { register, errors, control } = props.formControl;
  return (
    <>
      <CustomTextField
        label="모임명"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <HtmlInput formControl={props.formControl} />
      <CustomTextField
        label="일시"
        name="event_date"
        type="datetime-local"
        defaultValue={now}
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="모임 장소(또는 화상회의 링크)"
        name="place"
        defaultValue=""
        inputRef={register({
          required: false,
        })}
        errors={errors}
      />
      <CustomTextField
        label="모집인원 *"
        name="countPeople"
        type="number"
        defaultValue={0}
        InputProps={{
          endAdornment: <span>명</span>,
        }}
        inputRef={register({
          required: "필수 입력",
          min: {
            value: 1,
            message: "모집 최소 인원은 1명 입니다.",
          },
        })}
        errors={errors}
      />
      <CustomTextField
        label="신청마감일"
        name="deadline"
        type="datetime-local"
        defaultValue={now}
        register={register}
        errors={errors}
      />
      <Tags formControl={props.formControl} />
      <Hashtags formControl={props.formControl} />
      <Controller
        control={control}
        name="location"
        defaultValue={{ address: "" }}
        render={({ value, onChange }) => (
          <GooglePlaceAutocomplete state={value} setState={onChange} />
        )}
      />
    </>
  );
}
