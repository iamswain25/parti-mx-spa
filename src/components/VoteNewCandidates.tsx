import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
import { Candidate, VoteFormdata } from "../types";
import { UseFormMethods } from "react-hook-form/dist/types/form";
const useStyles = makeStyles((theme) => ({
  adorn: {
    "& > div": {
      flexWrap: "nowrap",
    },
  },
}));
export default function VoteNewCandidates({ formControl }: any) {
  const {
    register,
    errors,
    control,
    getValues,
    setValue,
    watch,
  } = formControl as UseFormMethods<VoteFormdata>;
  const classes = useStyles();
  const isBinary = watch("metadata.isBinary");
  const { fields, append, remove } = useFieldArray<Candidate, "uid">({
    name: "candidates",
    control,
    keyName: "uid",
  });

  function removeHandler(i: number) {
    if (fields.length > 2) {
      remove(i);
    } else {
      setValue(`candidates[${i}]`, { body: "" });
    }
  }
  function addHandler() {
    append({ body: "" });
  }
  function duplicate(value: string) {
    const { candidates } = getValues();
    const isDup = candidates?.filter((c) => c.body === value).length > 1;
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
          <div key={field.uid}>
            {/* <Controller
              name={`candidates[${index}].order`}
              control={control}
              defaultValue={index + 1}
              as={<input type="hidden" />}
            /> */}
            <CustomTextField
              defaultValue={field.body}
              label={`${index + 1}. 투표항목`}
              name={`candidates[${index}].body`}
              classes={{ root: classes.adorn }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => removeHandler(index)}>
                    <CloseIcon />
                  </IconButton>
                ),
              }}
              inputRef={register({
                required: "필수 입력",
                validate: duplicate,
              })}
              error={!!errors?.candidates?.[index]}
              required={!!errors?.candidates?.[index]}
              helperText={errors?.candidates?.[index]?.body?.message}
            />
          </div>
        );
      })}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
