import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import { makeNewVariables } from "./makePostVariables";
import { NoticeFormdata } from "../types";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import NoticeInput from "./NoticeInput";

export default function NoticeNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<NoticeFormdata>();
  const { handleSubmit } = formControl;
  async function handleForm(form: NoticeFormdata) {
    setLoading(true);
    const variables = await makeNewVariables(form, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
    });
    const res = await insert({
      variables,
    });
    const id = res?.data?.insert_mx_posts_one?.id;
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="New Notice" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">New Notice</Typography>
            <NoticeInput formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="Submit Notice" />
          </Container>
        </Box>
      </form>
    </>
  );
}
