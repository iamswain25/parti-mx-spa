import React from "react";
import TextField from "@material-ui/core/TextField";

export default function CustomTextField({
  register,
  errors = {},
  name,
  ...rest
}: any) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      name={name}
      fullWidth
      inputRef={
        register
          ? register({
              required: "Required",
            })
          : undefined
      }
      required={errors[name] ? true : false}
      error={errors[name] ? true : false}
      helperText={errors[name] && errors[name].message}
      {...rest}
    />
  );
}
