import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import { Post, Img, File as File2, SuggestionFormdata } from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import ImageFileDropzone from "./ImageFileDropzone";
import { firestore } from "../config/firebase";
export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id, title, body, context, files, images, password, name } = p;
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const formControl = useForm<SuggestionFormdata>({
    defaultValues: {
      title,
      body,
      context,
      password,
      name,
    },
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
    });
    firestore.collection("posts").doc(id).update(variables);
    history.push("/post/" + id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Hidden mdUp>
        <HeaderNew title="제보글 수정" />
      </Hidden>
      <Box mt={2}>
        <Container component="main" maxWidth="md">
          <Typography variant="h2">제보글 수정</Typography>
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
          <BtnSubmitDesktop text="제보 수정" />
        </Container>
      </Box>
    </form>
  );
}
