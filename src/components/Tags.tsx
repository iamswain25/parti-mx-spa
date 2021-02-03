import {
  FormControl,
  Typography,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { UseFormMethods } from "react-hook-form";
import { DEFAULT_HASHTAGS } from "../helpers/options";
const useStyles = makeStyles(theme => {
  return {
    tooltip: { fontSize: 15, whiteSpace: "pre-wrap" },
    icon: {
      marginLeft: 8,
      textDecoration: "underline dotted",
      cursor: "help",
    },
  };
});
export default function Tags(props: { formControl: UseFormMethods<any> }) {
  const { register } = props.formControl;
  const classes = useStyles();
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
