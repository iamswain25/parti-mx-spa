import React from "react";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { makeNewVariables } from "./makePostVariables";
import { NoticeFormdata } from "../types";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import NoticeInput from "./NoticeInput";
import { firestore } from "../config/firebase";
export default function NoticeNew() {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const history = useHistory();
  const [currentUser] = useCurrentUser();
  const [, setSuccess] = useSuccess();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<NoticeFormdata>();
  const { handleSubmit } = formControl;
  async function handleForm(form: NoticeFormdata) {
    const variables = await makeNewVariables(form, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
      created_by: currentUser?.uid,
      updated_by: currentUser?.uid,
      is_closed: false,
      is_announced: false,
      updated_at: new Date(),
      created_at: new Date(),
      type: "notice",
    });
    const doc = await firestore.collection("posts").add(variables);
    history.push("/post/" + doc.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="소식 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">소식 쓰기</Typography>
            <NoticeInput formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="소식 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
