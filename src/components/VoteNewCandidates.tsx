import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray, FormContextValues } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
import { VoteFormdata } from "../types";
const useStyles = makeStyles((theme) => ({
  adorn: {
    "& > div": {
      flexWrap: "nowrap",
    },
  },
}));
export default function VoteNewCandidates({
  formControl,
  isBinary = false,
}: any) {
  const {
    register,
    errors,
    control,
    getValues,
    clearError,
    unregister,
  } = formControl as FormContextValues<VoteFormdata>;
  const classes = useStyles();
  const { fields, append, remove } = useFieldArray({
    name: "candidates",
    control,
  });

  function removeHandler(i: number) {
    if (fields.length > 2) {
      remove(i);
    } else {
      const ref = control.fieldsRef.current?.[`candidates[${i}]`]?.ref;
      if (ref) {
        ref.value = "";
      }
    }
  }
  function addHandler() {
    append({ value: "" });
  }
  React.useEffect(() => {
    const { candidates } = getValues({ nest: true });
    if (!candidates) return;
    wasBinary.current = isBinary;
    if (isBinary) {
      clearError("candidates");
      fields.forEach((f, i) => {
        f.value = candidates[i];
      });
    }
  }, [isBinary, getValues, fields, clearError, unregister]);
  const wasBinary = React.useRef(false);
  function validate(value: string) {
    if (!wasBinary.current && !value) {
      return "필수 입력";
    }
  }
  function duplicate(value: string) {
    const { candidates } = getValues({ nest: true });
    const isDup = candidates.filter((c) => c === value).length > 1;
    if (isDup) {
      return "중복입니다";
    }
  }
  if (isBinary) {
    return null;
  }

  return (
    <>
      {fields.map((field, index) => {
        return (
          <CustomTextField
            defaultValue={field.value}
            key={field.id}
            label={`${index + 1}. 투표항목`}
            name={`candidates[${index}]`}
            classes={{ root: classes.adorn }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => removeHandler(index)}>
                  <CloseIcon />
                </IconButton>
              ),
            }}
            inputRef={register({
              validate: { required: validate, duplicate },
            })}
            error={!!errors?.candidates?.[index] && !wasBinary.current}
            required={!!errors?.candidates?.[index] && !wasBinary.current}
            helperText={errors?.candidates?.[index]?.message}
          />
        );
      })}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
