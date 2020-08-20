import React from "react";
import CustomTextField from "./CustomTextField";
import { defaultHashtags } from "../helpers/options";
import { UseFormMethods } from "react-hook-form";
import { SuggestionFormdata } from "../types";
import Hashtags from "./Hashtags";
import {
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
  Typography,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    tooltip: { fontSize: 15, whiteSpace: "pre-wrap" },
    icon: {
      marginLeft: 8,
      textDecoration: "underline dotted",
      cursor: "help",
    },
  };
});
export default function SuggestionInputs(props: {
  formControl: UseFormMethods<SuggestionFormdata>;
  children?: React.ReactNode;
}) {
  const { register, errors } = props.formControl;
  const classes = useStyles();
  return (
    <>
      <CustomTextField
        label="My question :: 나의 질문"
        name="title"
        autoFocus
        register={register}
        errors={errors}
      />
      <CustomTextField
        label="Description (Question & Image) :: 설명"
        multiline
        name="body"
        register={register}
        errors={errors}
      />
      <FormControl margin="normal">
        <Typography variant="h3" style={{ lineHeight: "30px" }}>
          Keywords :: 키워드
          <Tooltip
            title={`Keywords you are submitting will appear as #hashtag #keywords in your post. We can explore the landscape of questions through the network of keywords. During the open call, interim results of network analysis will be posted. To this end, please fill your ideas on keywords to share! \n\n작성하신 키워드는 포스팅에서 #해시태그#키워드로 표현됩니다. 오픈콜 참여자들이 작성한 다양한 키워드 네트워크를 통해 우리가 던지는 질문의 지형을 탐색해볼 예정입니다. 오픈콜이 진행되는 동안 키워드 네트워크를  분석해서 공유할 예정이니, 풍성한 참여 부탁드립니다!`}
            placement="top"
            classes={{ tooltip: classes.tooltip }}
            enterTouchDelay={0}
            leaveTouchDelay={5000}
          >
            <span
              role="img"
              aria-label="question"
              aria-labelledby="question"
              className={classes.icon}
            >
              *
            </span>
          </Tooltip>
        </Typography>
        <FormLabel component="legend">
          Core Keywords (Choose at least 3) :: 필수 키워드 (최소 3개 이상 선택)
        </FormLabel>
        <FormGroup row>
          {defaultHashtags.map((tag, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  name="tags"
                  color="primary"
                  inputRef={register()}
                  value={tag}
                />
              }
              label={"#" + tag}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Hashtags formControl={props.formControl} />
    </>
  );
}
