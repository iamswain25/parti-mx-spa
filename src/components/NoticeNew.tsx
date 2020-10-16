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
  const { board_id } = useParams<{ board_id: string }>();
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setError] = useGlobalState(keys.ERROR);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<NoticeFormdata>();
  const { handleSubmit } = formControl;
  async function handleForm(form: NoticeFormdata) {
    setLoading(true);
    const { customTags, tags, ...rest } = form;
    if (imageArr.length < 1) {
      return setError("must upload minimum 1 image");
    }
    const tagSet = new Set([...tags, ...customTags]);
    const tagArr = Array.from(tagSet);
    const variables = await makeNewVariables(rest, {
      tags: tagArr,
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
