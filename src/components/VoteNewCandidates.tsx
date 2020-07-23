import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { Grid, IconButton } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  adorn: {
    "& > div": {
      flexWrap: "nowrap",
    },
  },
}));
export default function VoteNewCandidates({ formControl }: any) {
  const { register, errors, control } = formControl;
  const classes = useStyles();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "candidates",
      control,
    }
  );
  function removeHandler(i: number) {
    if (fields.length > 2) {
      console.log(i);
      remove(i);
    }
  }
  function addHandler() {
    append({ candidates: "" });
  }

  return (
    <>
      {fields.map((field, index) => (
        <CustomTextField
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
          autoFocus
          register={register}
          errors={errors}
        />
      ))}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
