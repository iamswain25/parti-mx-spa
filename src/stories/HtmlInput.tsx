import React from "react";
import CustomTextField from "../components/CustomTextField";
import { UseFormMethods, Controller } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
export default function HtmlInput(props: { formControl: UseFormMethods<any> }) {
  const { register, errors, control, watch } = props.formControl;
  const { isHtml, html } = watch();
  return (
    <>
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
        label="내용에 HTML 편집기를 씁니다. *주의: 버전이 낮아 버그가 있습니다."
      />
      {isHtml ? (
        <Controller
          control={control}
          name="html"
          as={
            <Editor
              initialContentState={html}
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
    </>
  );
}
