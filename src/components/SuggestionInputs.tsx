import React from "react";
import CustomTextField from "./CustomTextField";
import { suggestionOptions } from "../helpers/options";
import { UseFormMethods, Controller } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
import { Editor } from "react-draft-wysiwyg";
import { RawDraftContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
}) {
  const { register, errors, control, watch } = props.formControl;
  const { isHtml } = watch();
  const [contentState, setContentState] = React.useState<
    RawDraftContentState | undefined
  >(undefined);
  function onEditorContentChange(_contentState: RawDraftContentState) {
    setContentState(_contentState);
  }
  return (
    <>
      <CustomTextField
        label="제목"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="제안 배경"
        multiline
        name="context"
        register={register}
        errors={errors}
      />
      <CustomTextField
        select
        label="제안 종료 방법"
        variant="filled"
        name="closingMethod"
        SelectProps={{ native: true }}
        defaultValue="30days"
        register={register}
        errors={errors}
        children={suggestionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      />
      <FormControlLabel
        control={
          <Controller
            name="isHtml"
            control={control}
            defaultValue={false}
            render={({ onChange, value }) => (
              <Checkbox
                color="primary"
                checked={value}
                onChange={(e) => onChange(e.currentTarget.checked)}
              />
            )}
          />
        }
        label="HTML 편집기를 씁니다."
      />
      {isHtml ? (
        <Controller
          control={control}
          name="html"
          as={
            <Editor
              initialContentState={contentState}
              onContentStateChange={onEditorContentChange}
              wrapperClassName="editorWrapper"
              editorClassName="editorContent"
            />
          }
        />
      ) : (
        <CustomTextField
          label="내용"
          multiline
          name="body"
          register={register}
          errors={errors}
        />
      )}

      <Hashtags formControl={props.formControl} />
    </>
  );
}
