import React from "react";
import { Controller } from "react-hook-form";
import { Switch } from "@material-ui/core";

export default function ControlledSwitch({
  control,
  name,
  disabled = false,
  defaultValue = false,
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value, ...rest }) => (
        <Switch
          {...rest}
          color="primary"
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
        />
      )}
    />
  );
}
