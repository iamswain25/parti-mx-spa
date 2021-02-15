import React from "react";
import CustomTextField from "./CustomTextField";
import { UseFormMethods, Controller } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    toolbarClassName: {
      [theme.breakpoints.down("sm")]: {
        // top: 56,
      },
      [theme.breakpoints.up("md")]: {
        position: "sticky",
        zIndex: 3,
        top: 100,
      },
    },
    wrapperClassName: { border: "1px solid black" },
    editorClassName: { padding: "0 16px", maxHeight: 800 },
  };
});
export default function HtmlInput(props: { formControl: UseFormMethods<any> }) {
  const { register, errors, control, watch } = props.formControl;
  const { isHtml = true, html } = watch();
  const classes = useStyles();
  return (
    <>
      <Controller
        name="isHtml"
        control={control}
        defaultValue={true}
        render={({ onChange, value }) => (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={value}
                onChange={(e) => onChange(e.currentTarget.checked)}
              />
            }
            label="HTML 편집기 사용 (*주의: 체크해제 시 작성중인 내용이 사라집니다)"
          />
        )}
      />
      {isHtml ? (
        <Controller
          control={control}
          name="html"
          defaultValue=""
          as={
            <Editor
              initialContentState={html}
              toolbarClassName={classes.toolbarClassName}
              wrapperClassName={classes.wrapperClassName}
              editorClassName={classes.editorClassName}
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
