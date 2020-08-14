import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField, FormControl } from "@material-ui/core";
import { UseFormMethods, Controller } from "react-hook-form";
import { SuggestionFormdata } from "../types";
// import { defaultHashtags } from "../helpers/options";

export default function Hashtags(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { control } = props.formControl;
  return (
    <FormControl margin="normal" fullWidth>
      <Controller
        name="customTags"
        control={control}
        defaultValue={[]}
        render={({ onChange, ...props }) => (
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Hashtag"
                placeholder="Enter your Hashtag"
              />
            )}
            onChange={(e, data) => onChange(data)}
            {...props}
          />
        )}
        onChange={([, data]: [any, any]) => data}
      />
    </FormControl>
  );
}
