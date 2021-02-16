import {
  FormControl,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { UseFormMethods } from "react-hook-form";
import { DEFAULT_HASHTAGS } from "../helpers/options";
export default function Tags(props: { formControl: UseFormMethods<any> }) {
  const { register, errors } = props.formControl;
  return (
    <>
      <FormControl margin="normal">
        <Typography
          variant="h4"
          style={{ lineHeight: "30px" }}
          color={errors.tags ? "error" : "inherit"}
        >
          주제 선택 *
        </Typography>
        {errors.tags?.type === "required" && (
          <Typography variant="h6" color="error">
            필수 입력
          </Typography>
        )}
        <FormGroup row>
          {DEFAULT_HASHTAGS.map((tag, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  name="tags"
                  color="primary"
                  inputRef={register({ required: "필수 입력" })}
                  value={tag}
                />
              }
              label={"#" + tag}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
}
