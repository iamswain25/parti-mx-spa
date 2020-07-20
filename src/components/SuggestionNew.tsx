import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import { uploadFileGetUriArray } from "../config/firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";

const options = [{ label: "30일 후 종료", value: "30days" }];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
interface Formdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
}
export default function SuggestionNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const { handleSubmit, register, errors } = useForm<Formdata>();
  const classes = useStyles();
  function imageUploaderHandler(files: File[], pictures: string[]) {
    setImageArr(files);
    setFileArr([]);
  }

  async function handleForm(form: Formdata) {
    setLoading(true);
    const { title, context, body, closingMethod } = form;
    let images = null;
    if (imageArr.length > 0) {
      images = await Promise.all(imageArr.map(uploadFileGetUriArray));
      setSuccess(images?.length + " 개의 사진 업로드 성공");
    }
    let files = null;
    if (fileArr.length > 0) {
      files = await Promise.all(fileArr.map(uploadFileGetUriArray));
      setSuccess(files?.length + " 개의 파일 업로드 성공");
    }
    const res = await insert({
      variables: {
        title,
        context,
        body,
        board_id,
        group_id,
        metadata: { closingMethod },
        images,
        files,
      },
    });
    const id = res?.data?.insert_mx_posts_one?.id;
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <Hidden mdUp>
          <HeaderNew title="제안글 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">새로운 제안</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="제안 제목"
              name="title"
              autoFocus
              inputRef={register({
                required: "필수 입력",
              })}
              required={errors.title ? true : false}
              error={errors.title ? true : false}
              helperText={errors.title && errors.title.message}
            />
            <TextField
              select
              fullWidth
              label="제안 종료 방법"
              variant="filled"
              name="closingMethod"
              inputRef={register({
                required: "필수 입력",
              })}
              SelectProps={{
                native: true,
              }}
              defaultValue="30days"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="context"
              label="제안 배경"
              inputRef={register({
                required: "필수 입력",
              })}
              required={errors.context ? true : false}
              error={errors.context ? true : false}
              helperText={errors.context && errors.context.message}
            />
            <TextField
              variant="outlined"
              multiline
              margin="normal"
              fullWidth
              name="body"
              label="제안 내용"
              inputRef={register({
                required: "필수 입력",
              })}
              required={errors.body ? true : false}
              error={errors.body ? true : false}
              helperText={errors.body && errors.body.message}
            />
            {/* <TextField
          variant="outlined"
          name="address"
          fullWidth
          label="주소"
          helperText="대한민국 서울특별시 서대문구 남가좌1동 서대문구사회적경제마을센터"
        /> */}
            <ImageUploader
              withIcon={true}
              buttonText="이미지를 첨부하세요"
              onChange={imageUploaderHandler}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            <Hidden smDown implementation="css">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                제안 제출
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
