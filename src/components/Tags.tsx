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
  const { register } = props.formControl;
  return (
    <>
      <FormControl margin="normal">
        <Typography variant="h3" style={{ lineHeight: "30px" }}>
          주제 선택
        </Typography>
        <FormGroup row>
          {DEFAULT_HASHTAGS.map((tag, i) => (
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
              label={"#" + tag}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
}
