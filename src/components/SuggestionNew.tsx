import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box } from "@material-ui/core";
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
  const { handleSubmit } = formControl;

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
        count_like: 0,
        count_comment: 0,
        count_view: 0,
        is_closed: false,
        updated_at: new Date(),
        created_at: new Date(),
        type: "suggestion",
      });
      if (!currentUser.displayName) {
        await currentUser.updateProfile({ displayName: form.name });
      }
      const doc = await firestore.collection("posts").add(variables);
      history.push("/post/" + doc.id);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">전시글 쓰기</Typography>
            <Typography variant="h3" color="primary">
              전시해주신 내용은 아동의 개인정보 노출을 방지하기 위해 일부 수정될
              수 있습니다. 상세한 내용은 소식 게시판의 공지 글을 확인해주세요.
            </Typography>
            <SuggestionInputs formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="전시 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
