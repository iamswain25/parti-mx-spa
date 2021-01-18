import React from "react";
import CustomTextField from "./CustomTextField";
import { getDatetimeFormat } from "../helpers/datefns";
import HtmlInput from "./HtmlInput";
const now = getDatetimeFormat(new Date());
export default function EventInputs({ formControl }: any) {
  const { register, errors } = formControl;
  return (
    <>
      <CustomTextField
        label="모임명"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="일시"
        name="event_date"
        type="datetime-local"
        defaultValue={now}
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="장소"
        name="place"
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="모집인원"
        name="count_people"
        type="number"
        defaultValue={10}
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
      <HtmlInput formControl={formControl} />
    </>
  );
}
