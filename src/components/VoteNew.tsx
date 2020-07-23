import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import { uploadFileGetUriArray } from "../config/firebase";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, useFieldArray } from "react-hook-form";
import ImageUploader from "react-images-upload";
import CloseIcon from "@material-ui/icons/Close";
import {
  Container,
  Typography,
  Box,
  Hidden,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import CustomTextField from "./CustomTextField";
import VoteNewCandidates from "./VoteNewCandidates";
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
  adorn: {
    "& > div": {
      flexWrap: "nowrap",
    },
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
interface Formdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
  candidates: string[];
}
export default function VoteNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [qCount, setQCount] = React.useState(2);
  const [isBinary, setBinary] = React.useState(false);
  const [isMultiple, setMultiple] = React.useState(false);
  const [isAnonymous, setAnonymous] = React.useState(false);
  const [isResultHidden, setResultHidden] = React.useState(false);
  const [closingMethod, setClosingMethod] = React.useState("7days");
  const formControl = useForm<Formdata>({
    defaultValues: { candidates: ["", ""] },
  });
  const { handleSubmit, register, errors } = formControl;
  const classes = useStyles();
  function imageUploaderHandler(files: File[], pictures: string[]) {
    setImageArr(files);
  }

  async function handleForm(form: Formdata) {
    // return console.log(form);
    setLoading(true);
    const { title, body } = form;
    let images = null;
    if (imageArr.length > 0) {
      images = await Promise.all(imageArr.map(uploadFileGetUriArray));
      setSuccess(images?.length + " 개의 사진 업로드 성공");
    }
    let files = null;
    if (fileArr.length > 0) {
      files = await Promise.all(fileArr.map(uploadFileGetUriArray));
      setSuccess(files?.length + " 개의 파일 업로드 성공");
    }
    const variables: any = {
      title,
      body,
      board_id,
      group_id,
      images,
      files,
    };
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
          <HeaderNew title="투표 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">투표 쓰기</Typography>
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
              autoFocus
              register={register}
              errors={errors}
            />
            <VoteNewCandidates formControl={formControl} />
            <ImageUploader
              withIcon={true}
              buttonText="이미지를 첨부하세요"
              onChange={imageUploaderHandler}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <Hidden smDown implementation="css">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                투표 제출
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
