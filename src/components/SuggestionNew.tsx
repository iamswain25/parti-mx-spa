import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, LinearProgress } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
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
  const [currentUser] = useCurrentUser();
  const [, setSuccess] = useSuccess();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<SuggestionFormdata>();
  const { handleSubmit, formState } = formControl;

  async function handleForm(form: SuggestionFormdata) {
    if (currentUser) {
      const variables = await makeNewVariables(form, {
        board_id,
        group_id,
        imageArr,
        fileArr,
        setSuccess,
        created_by: currentUser.uid,
        updated_by: currentUser.uid,
        is_closed: false,
        updated_at: new Date(),
        created_at: new Date(),
        type: "suggestion",
      });
      const doc = await firestore.collection("posts").add(variables);
      history.push("/post/" + doc.id);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Box mt={2}>
          {formState.isSubmitting && <LinearProgress />}
          <Container component="main" maxWidth="md">
            <Typography variant="h2">공론장 제안글 쓰기</Typography>
            <SuggestionInputs formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop
              text="제안하기"
              isSubmitting={formState.isSubmitting}
            />
          </Container>
        </Box>
      </form>
    </>
  );
}
