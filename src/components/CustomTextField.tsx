import React from "react";
import TextField from "@material-ui/core/TextField";
export default function CustomTextField({ register, errors, ...rest }: any) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      inputRef={register({
        required: "필수 입력",
      })}
      required={errors.title ? true : false}
      error={errors.title ? true : false}
      helperText={errors.title && errors.title.message}
      {...rest}
    />
  );
}
