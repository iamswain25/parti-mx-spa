import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import { uploadFileGetUriArray } from "../config/firebase";
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
import {
  Post,
  Image,
  File as File2,
  LatLng,
  SuggestionMetadata,
} from "../types";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import SavedImageFile from "./SavedImageFile";

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
export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [address, setAddress] = React.useState<undefined | string>(undefined);
  const [latLng, setLatLng] = React.useState<undefined | LatLng>(undefined);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const { handleSubmit, register, errors, reset } = useForm<Formdata>();
  React.useEffect(() => {
    const { location, title, body, context, files, images } = p;
    const metadata = p.metadata as SuggestionMetadata;
    reset({ title, body, context, closingMethod: metadata.closingMethod });
    setImages2(images);
    setFiles2(files);
    setAddress(metadata?.address);

    if (location) {
      const {
        coordinates: [lng, lat],
      } = location;
      setLatLng({ lng, lat });
    }
  }, [reset, p]);
  const classes = useStyles();
  function imageUploaderHandler(files: File[], pictures: string[]) {
    setImageArr(files);
  }

  async function handleForm(form: Formdata) {
    setLoading(true);
    const { title, context, body, closingMethod } = form;
    let images = null;
    if (imageArr.length) {
      images = await Promise.all(imageArr.map(uploadFileGetUriArray));
      setSuccess(images?.length + " 개의 사진 업로드 성공");
    }
    if (images2) {
      images = [...images2, ...(images || [])];
    }
    let files = null;
    if (fileArr.length) {
      files = await Promise.all(fileArr.map(uploadFileGetUriArray));
      setSuccess(files?.length + " 개의 파일 업로드 성공");
    }
    if (files2) {
      files = [...files2, ...(files || [])];
    }
    const variables: any = {
      id,
      title,
      context,
      body,
      metadata: { closingMethod, address },
      images,
      files,
    };
    if (latLng) {
      const { lat, lng } = latLng;
      const location = {
        type: "Point",
        coordinates: [lng, lat],
      };
      variables.location = location;
    }
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
            <GooglePlaceAutocomplete
              address={address}
              setAddress={setAddress}
              latLng={latLng}
              setLatLng={setLatLng}
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
                제안 수정
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
