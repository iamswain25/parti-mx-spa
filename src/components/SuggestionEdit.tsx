import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import {
  Post,
  Image,
  File as File2,
  SuggestionMetadata,
  SuggestionFormdata,
} from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";

export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const formControl = useForm<SuggestionFormdata>();
  const { handleSubmit, reset } = formControl;
  React.useEffect(() => {
    const { title, body, context, files, images } = p;
    const metadata = p.metadata as SuggestionMetadata;
    reset({ title, body, context, closingMethod: metadata.closingMethod });
    setImages2(images);
    setFiles2(files);
  }, [reset, p]);

  async function handleForm(form: SuggestionFormdata) {
    setLoading(true);
    const { closingMethod, ...rest } = form;
    const metadata = { closingMethod };
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
      metadata,
    });
    await update({ variables });
    history.push("/post/" + id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Hidden mdUp>
        <HeaderNew title="제안글 수정" />
      </Hidden>
      <Box mt={2}>
        <Container component="main" maxWidth="md">
          <Typography variant="h2">제안글 수정</Typography>
          <SuggestionInputs formControl={formControl} />
          <CustomImageUploader setImageArr={setImageArr} />
          <Dropzone files={fileArr} setFiles={setFileArr} />
          <SavedImageFile
            files={files2}
            images={images2}
            setFiles={setFiles2}
            setImages={setImages2}
          />
          <BtnSubmitDesktop text="제안 수정" />
        </Container>
      </Box>
    </form>
  );
}
