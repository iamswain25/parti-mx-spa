import React from "react";
import TextField from "@material-ui/core/TextField";

export default function CustomTextField({
  register,
  errors = {},
  name,
  ...rest
}: any) {
  let error;
  try {
    error = eval("errors?." + name);
  } catch (error) {
    error = false;
  }
  return (
    <TextField
      variant="outlined"
      margin="normal"
      name={name}
      fullWidth
      inputRef={
        register
          ? register({
              required: "필수 입력",
            })
          : undefined
      }
      required={!!register}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
