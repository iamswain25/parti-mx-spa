import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, UseFormMethods } from "react-hook-form";
import { AGE, SIGNUP_AREA, SEOUL_DISTRICT } from "../helpers/options";
export default function UserExtraInfo(props: {
  formControl: UseFormMethods<any>;
}) {
  const { errors, control, watch } = props.formControl;
  const area = watch("area");
  return (
    <>
      <Controller
        name="age"
        control={control}
        defaultValue=""
        as={
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            select
            label="Age"
            SelectProps={{ native: true }}
            children={AGE.map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          />
        }
      />
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
      {area === "서울특별시" && (
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
              children={SEOUL_DISTRICT.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            />
          }
        />
      )}
    </>
  );
}
