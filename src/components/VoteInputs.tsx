import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import ControlledSwitch from "./ControlledSwitch";
import { voteOptions } from "../helpers/options";
import VoteEditCandidates from "./VoteEditCandidates";
import VoteNewCandidates from "./VoteNewCandidates";
import HtmlInput from "./HtmlInput";
import Hashtags from "./Hashtags";
import { UseFormMethods } from "react-hook-form";
import { VoteFormdata } from "../types";

export default function VoteInputs({
  formControl,
  isEdit = false
}: {
  formControl: UseFormMethods<VoteFormdata>;
  isEdit?: boolean;
}) {
  const { register, errors, control, watch } = formControl;
  const isBinary = watch("metadata.isBinary");
  return (
    <>
      <CustomTextField
        label="제목"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <HtmlInput formControl={formControl} />
      <CustomTextField
        register={register}
        errors={errors}
        select
        label="투표 종료 방법"
        variant="filled"
        name="metadata.closingMethod"
        SelectProps={{
          native: true
        }}
        defaultValue="7days"
        children={voteOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      />
      <Grid container justify="space-between" alignItems="center">
        찬반투표
        <ControlledSwitch
          control={control}
          name="metadata.isBinary"
          disabled={isEdit}
        />
      </Grid>
      {isEdit ? (
        <VoteEditCandidates formControl={formControl} />
      ) : (
        <VoteNewCandidates formControl={formControl} />
      )}
      <Grid container justify="space-between" alignItems="center">
        <Typography>익명투표</Typography>
        <ControlledSwitch
          control={control}
          name="metadata.isAnonymous"
          disabled={isEdit}
        />
      </Grid>
      {!isBinary && (
        <Grid container justify="space-between" alignItems="center">
          <Typography>중복투표</Typography>
          <ControlledSwitch
            control={control}
            name="metadata.isMultiple"
            disabled={isEdit}
          />
        </Grid>
      )}
      <Grid container justify="space-between" alignItems="center">
        <Typography>종료 될 때까지 중간 투표 집계를 숨깁니다.</Typography>
        <ControlledSwitch
          control={control}
          name="metadata.isResultHidden"
          disabled={isEdit}
        />
      </Grid>
    </>
  );
}
