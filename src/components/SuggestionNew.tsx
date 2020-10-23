import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import ImageFileDropzone from "./ImageFileDropzone";
import { makeNewVariables } from "./makePostVariables";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import { SuggestionFormdata } from "../types";
import { firestore } from "../config/firebase";
export default function SuggestionNew() {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<SuggestionFormdata>();
  const { handleSubmit } = formControl;

  async function handleForm(form: SuggestionFormdata) {
    const variables = await makeNewVariables(form, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
    });
    const doc = await firestore.collection("posts").add(variables);
    history.push("/post/" + doc.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="제보글 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">제보글 쓰기</Typography>
            <SuggestionInputs formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="제안 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
