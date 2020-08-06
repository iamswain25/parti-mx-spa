import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField, FormControl } from "@material-ui/core";
import { UseFormMethods, Controller } from "react-hook-form";
import { SuggestionFormdata } from "../types";
const names = [
  "publicspace",
  "공공공간",
  "community",
  "커뮤니티",
  "history",
  "역사",
  "density",
  "밀도",
];

export default function Hashtags(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { control } = props.formControl;
  return (
    <FormControl margin="normal" fullWidth>
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ onChange, ...props }) => (
          <Autocomplete
            multiple
            options={names}
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
                label="태그"
                placeholder="태그를 입력해주세요"
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
