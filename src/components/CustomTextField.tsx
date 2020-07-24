import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > div": {
      flexWrap: "nowrap",
    },
  },
}));
export default function CustomTextField({
  register,
  errors = {},
  name,
  ...rest
}: any) {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      margin="normal"
      name={name}
      classes={{ root: classes.root }}
      fullWidth
      inputRef={
        register
          ? register({
              required: "필수 입력",
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
