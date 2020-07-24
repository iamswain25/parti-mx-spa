import React from "react";
import Button from "@material-ui/core/Button";
import { useFieldArray, FormContextValues, Controller } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Box } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import AddIcon from "@material-ui/icons/Add";
import { VoteEditFormdata, Candidate } from "../types";
export const deletingIds: any[] = [];
export default function VoteEditCandidates({
  formControl,
  isBinary = false,
}: any) {
  const { errors, control, getValues } = formControl as FormContextValues<
    VoteEditFormdata
  >;
  const { fields, append, remove } = useFieldArray<Candidate>({
    name: "candidates",
    control,
  });
  function removeHandler(i: number) {
    if (fields.length > 2) {
      remove(i);
      if (fields[i].__typename) {
        deletingIds.push(fields[i].id);
      }
    } else {
      const ref = control.fieldsRef.current?.[`candidates[${i}].body`]?.ref;
      if (ref) {
        ref.value = "";
      }
    }
  }
  function addHandler() {
    append({ body: "" });
  }
  function validate(value: string) {
    if (!isBinary && !value) {
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
        const voteCount = field?.votes_aggregate?.aggregate?.sum?.count || 0;
        const hasVote = voteCount > 0;
        return (
          <Box key={field.id}>
            <Controller
              name={`candidates[${index}].id`}
              control={control}
              defaultValue={field.id}
              as={<input type="hidden" />}
            />
            <Controller
              as={
                <CustomTextField
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
                  error={!!errors?.candidates?.[index] && !isBinary}
                  required={!!errors?.candidates?.[index] && !isBinary}
                  helperText={errors?.candidates?.[index]?.body?.message}
                />
              }
              control={control}
              defaultValue={field.body}
              name={`candidates[${index}].body`}
              rules={{ validate: { required: validate, duplicate } }}
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
