import React from "react";
import Button from "@material-ui/core/Button";
import { useFieldArray, Controller } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Box, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { VoteFormdata, Candidate } from "../types";
import { UseFormMethods } from "react-hook-form/dist/types/form";
export const deletingIds: any[] = [];
export default function VoteEditCandidates({
  formControl,
  is_binary = false,
}: {
  formControl: UseFormMethods<VoteFormdata>;
  is_binary?: boolean;
}) {
  const { errors, control, getValues, setValue } = formControl;
  const { fields, append, remove } = useFieldArray<Candidate, "uid">({
    name: "candidates",
    control,
    keyName: "uid",
  });
  function removeHandler(i: number) {
    if (fields.length > 2) {
      remove(i);
      if (fields[i].id) {
        deletingIds.push(fields[i].id);
      }
    } else {
      setValue(`candidates[${i}]`, { body: "" });
    }
  }
  function addHandler() {
    append({ body: "", id: "" });
  }
  function duplicate(value: string) {
    const { candidates } = getValues();
    const isDup = candidates?.filter((c) => c.body === value).length > 1;
    if (isDup) {
      return "중복입니다";
    }
  }
  if (is_binary) {
    return null;
  }
  return (
    <>
      {fields.map((field, index) => {
        const voteCount = 0;
        const hasVote = voteCount > 0;
        return (
          <Box key={field.uid}>
            <Controller
              name={`candidates[${index}].id`}
              control={control}
              defaultValue={field.id}
              as={<input type="hidden" />}
              rules={{ required: false }}
            />
            <Controller
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label={`${index + 1}. 투표항목`}
                  disabled={hasVote}
                  InputProps={{
                    endAdornment: hasVote ? (
                      <Box>{voteCount}</Box>
                    ) : (
                      <IconButton onClick={() => removeHandler(index)}>
                        <CloseIcon />
                      </IconButton>
                    ),
                  }}
                  error={!!errors?.candidates?.[index]}
                  required={!!errors?.candidates?.[index]}
                  helperText={errors?.candidates?.[index]?.body?.message}
                />
              }
              control={control}
              defaultValue={field.body}
              name={`candidates[${index}].body`}
              rules={{ required: "필수입력", validate: duplicate }}
            />
          </Box>
        );
      })}
      <Button onClick={addHandler} startIcon={<AddIcon />}>
        항목추가
      </Button>
    </>
  );
}
