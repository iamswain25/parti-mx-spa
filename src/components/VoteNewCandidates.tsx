import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray, FormContextValues } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
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
  } = formControl as FormContextValues<any>;
  const classes = useStyles();
  const { fields, append, remove } = useFieldArray({
    name: "candidates",
    control,
  });

  function removeHandler(i: number) {
    if (fields.length > 2) {
      console.log(i);
      remove(i);
    }
  }
  function addHandler() {
    append({ value: "" });
  }
  React.useEffect(() => {
    const { candidates } = getValues({ nest: true });
    if (isBinary) {
      fields.forEach((f, i) => {
        f.value = candidates[i];
      });
    }
  }, [isBinary, getValues, fields]);
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
            register={register}
            errors={errors}
          />
        );
      })}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
