import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray, FormContextValues, Controller } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
import { VoteEditFormdata } from "../types";
const useStyles = makeStyles((theme) => ({
  adorn: {
    "& > div": {
      flexWrap: "nowrap",
    },
  },
}));
export default function VoteEditCandidates({
  formControl,
  isBinary = false,
}: any) {
  const {
    errors,
    control,
    getValues,
    clearError,
    unregister,
  } = formControl as FormContextValues<VoteEditFormdata>;
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
    append({ body: "" });
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
  console.log(fields);
  const wasBinary = React.useRef(false);
  function validate(value: string) {
    if (!wasBinary.current && !value) {
      return "필수 입력";
    }
  }
  function duplicate(value: string) {
    const { candidates } = getValues({ nest: true });
    const isDup = candidates.filter((c) => c.body === value).length > 1;
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
        const disabled = field?.votes_aggregate?.aggregate?.sum?.count > 0;
        return (
          <Controller
            as={
              <CustomTextField
                defaultValue=""
                label={`${index + 1}. 투표항목`}
                classes={{ root: classes.adorn }}
                disabled={disabled}
                InputProps={{
                  endAdornment: !disabled && (
                    <IconButton onClick={() => removeHandler(index)}>
                      <CloseIcon />
                    </IconButton>
                  ),
                }}
                error={!!errors?.candidates?.[index] && !wasBinary.current}
                required={!!errors?.candidates?.[index] && !wasBinary.current}
                helperText={errors?.candidates?.[index]?.body?.message}
              />
            }
            control={control}
            defaultValue={field.body}
            key={field.id}
            name={`candidates[${index}].body`}
            rules={{ validate: { required: validate, duplicate } }}
          />
        );
      })}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
