import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, UseFormMethods } from "react-hook-form";
import { SIGNUP_AREA, areaDistrictList } from "../helpers/options";
export default function UserExtraInfo(props: {
  formControl: UseFormMethods<any>;
}) {
  const { errors, control, watch, register } = props.formControl;
  const area = watch("area");
  const areaObj = areaDistrictList.find(x => x.label === area);
  return (
    <>
      <Controller
        control={control}
        name="area"
        defaultValue=""
        as={
          <TextField
            select
            SelectProps={{ native: true }}
            variant="outlined"
            margin="normal"
            fullWidth
            label="거주지 광역 단위"
            error={!!errors.area}
            helperText={errors?.area?.message}
            children={SIGNUP_AREA.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          />
        }
      />
      {areaObj && (
        <Controller
          control={control}
          name="address"
          defaultValue=""
          as={
            <TextField
              select
              SelectProps={{ native: true }}
              variant="outlined"
              margin="normal"
              fullWidth
              label="거주지 시,군"
              error={!!errors.address}
              helperText={errors?.address?.message}
              children={areaObj?.value.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            />
          }
        />
      )}
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="organization"
        label="소속"
        inputRef={register()}
        required={!!errors.organization}
        error={!!errors.organization}
        helperText={errors?.organization?.message}
      />
    </>
  );
}
