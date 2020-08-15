import React from "react";
import CustomTextField from "./CustomTextField";
import { defaultHashtags } from "../helpers/options";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
import {
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
} from "@material-ui/core";

export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { register, errors } = props.formControl;
  return (
    <>
      <CustomTextField
        label="Insert your question"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      {/* <CustomTextField
        label="제안 배경"
        multiline
        name="context"
        register={register}
        errors={errors}
      /> */}
      {/* <CustomTextField
        select
        label="제안 종료 방법"
        variant="filled"
        name="closingMethod"
        SelectProps={{ native: true }}
        defaultValue="30days"
        register={register}
        errors={errors}
        children={suggestionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      /> */}
      <CustomTextField
        label="Details"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <FormControl margin="normal">
        <FormLabel component="legend">Hashtags</FormLabel>
        <FormGroup row>
          {defaultHashtags.map((tag, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  name="tags"
                  color="primary"
                  inputRef={register()}
                  value={tag}
                />
              }
              label={tag}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Hashtags formControl={props.formControl} />
    </>
  );
}
