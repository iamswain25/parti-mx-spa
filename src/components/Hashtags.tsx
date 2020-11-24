import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField, FormControl } from "@material-ui/core";
import { UseFormMethods, Controller } from "react-hook-form";
import { DEFAULT_HASHTAGS } from "../helpers/options";
import { Metadata } from "../types";
export default function Hashtags(props: { formControl: any }) {
  const { control } = props.formControl;
  const changeHandler = (onChange: any) => (e: any, data: any) => {
    return onChange(
      data
        .join(",")
        .split(/[\s,;#]+/)
        .filter((e: any) => e)
    );
  };
  return (
    <FormControl margin="normal" fullWidth>
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ onChange, ...props }) => (
          <Autocomplete
            multiple
            options={DEFAULT_HASHTAGS}
            freeSolo
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={"#" + option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="#해시태그"
                placeholder="Enter your Hashtag"
              />
            )}
            onChange={changeHandler(onChange)}
            {...props}
          />
        )}
      />
    </FormControl>
  );
}
