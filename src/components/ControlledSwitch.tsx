import React from "react";
import { Controller } from "react-hook-form";
import { Switch } from "@material-ui/core";

export default function ControlledSwitch({
  control,
  name,
  disabled = false,
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      as={<Switch color="primary" disabled={disabled} />}
      defaultValue={false}
    />
  );
}
