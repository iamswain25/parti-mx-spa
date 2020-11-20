import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
type CustomTextFieldProps = Partial<TextFieldProps> & {
  register?: any;
  errors?: any;
  name?: string;
};
export default function CustomTextField({
  register,
  errors = {},
  name,
  ...rest
}: CustomTextFieldProps) {
  const error = name?.split(".")?.reduce((o: any, i) => o?.[i], errors);
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
