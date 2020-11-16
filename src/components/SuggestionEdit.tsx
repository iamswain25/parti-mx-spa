import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { Post, Img, File as File2, SuggestionFormdata } from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import ImageFileDropzone from "./ImageFileDropzone";
import { firestore } from "../config/firebase";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id, files, images } = p;
  const history = useHistory();
  const [, setSuccess] = useSuccess();
  const [currentUser] = useCurrentUser();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const formControl = useForm<SuggestionFormdata>({
    defaultValues: p as SuggestionFormdata,
  });
  const { handleSubmit } = formControl;

  async function handleForm(form: SuggestionFormdata) {
    const variables = await makeUpdateVariables(form, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
      updated_at: new Date(),
      updated_by: currentUser?.uid,
    });
    await firestore.collection("posts").doc(id).update(variables);
    history.push("/post/" + id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Hidden mdUp>
        <HeaderNew title="전시글 수정" />
      </Hidden>
      <Box mt={2}>
        <Container component="main" maxWidth="md">
          <Typography variant="h2">전시글 수정</Typography>
          <SuggestionInputs formControl={formControl} />
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
          <BtnSubmitDesktop text="전시 수정" />
        </Container>
      </Box>
    </form>
  );
}
