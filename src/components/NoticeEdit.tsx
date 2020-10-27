import React from "react";

import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";

import { Post, Img, File as File2, NoticeFormdata } from "../types";
import SavedImageFile from "./SavedImageFile";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import NoticeInput from "./NoticeInput";

export default function NoticeEdit({ post: p }: { post: Post }) {
  const { id, title, body, files, images, html } = p;
  const history = useHistory();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const formControl = useForm<NoticeFormdata>({
    defaultValues: { title, body, html, isHtml: !!html },
  });
  const { handleSubmit } = formControl;

  async function handleForm(form: NoticeFormdata) {
    // const variables = await makeUpdateVariables(form, {
    //   imageArr,
    //   fileArr,
    //   images2,
    //   files2,
    //   setSuccess,
    //   id,
    // });
    // const res = await update({
    //   variables,
    // });
    // console.log(res);
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="소식 수정" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">소식 수정</Typography>
            <NoticeInput formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <SavedImageFile
              files={files2}
              images={images2}
              setFiles={setFiles2}
              setImages={setImages2}
            />
            <BtnSubmitDesktop text="소식 수정" />
          </Container>
        </Box>
      </form>
    </>
  );
}
