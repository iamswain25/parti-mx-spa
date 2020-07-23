import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import { Post, Image, File as File2, NoticeFormdata } from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";

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

export default function NoticeEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const { handleSubmit, register, errors, reset } = useForm<NoticeFormdata>();
  React.useEffect(() => {
    const { title, body, files, images } = p;
    reset({ title, body });
    setImages2(images);
    setFiles2(files);
  }, [reset, p]);
  const classes = useStyles();
  function imageUploaderHandler(files: File[], pictures: string[]) {
    setImageArr(files);
  }

  async function handleForm(form: NoticeFormdata) {
    setLoading(true);
    const variables = await makeUpdateVariables(form, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
    });
    const res = await update({
      variables,
    });
    console.log(res);
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <Hidden mdUp>
          <HeaderNew title="제안글 수정" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">제안글 수정</Typography>
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

            <ImageUploader
              withIcon={true}
              buttonText="이미지를 첨부하세요"
              onChange={imageUploaderHandler}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <SavedImageFile
              files={files2}
              images={images2}
              setFiles={setFiles2}
              setImages={setImages2}
            />
            <Hidden smDown implementation="css">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                소식 수정
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
