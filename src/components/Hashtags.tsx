import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField, FormControl } from "@material-ui/core";
import { UseFormMethods, Controller } from "react-hook-form";
export default function Hashtags(props: { formControl: UseFormMethods<any> }) {
  const { control } = props.formControl;
  const changeHandler = (onChange: any) => (e: any, data: any) => {
    return onChange(
      data
        .join(",")
        .split(/[\s,;#]+/)
        .filter((e: any) => e),
    );
  };
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
                  label={"#" + option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="#해시태그"
                placeholder="단어 입력후 엔터를 눌러 추가하세요"
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
