import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import CustomTextField from "./CustomTextField";
import CustomImageUploader from "./CustomImageUploader";
import { makeNewVariables } from "./makePostVariables";
import { NoticeFormdata } from "../types";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NoticeNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const { handleSubmit, register, errors } = useForm<NoticeFormdata>();
  const classes = useStyles();
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
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <Hidden mdUp>
          <HeaderNew title="소식 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">소식 쓰기</Typography>
            <CustomTextField
              label="제목"
              name="title"
              autoFocus
              register={register}
              errors={errors}
            />
            <CustomTextField
              label="내용"
              multiline
              name="body"
              register={register}
              errors={errors}
            />
            <CustomImageUploader setImageArr={setImageArr} />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <Hidden smDown implementation="css">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                소식 제출
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
