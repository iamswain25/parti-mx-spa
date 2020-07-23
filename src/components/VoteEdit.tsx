import React from "react";
import { useMutation } from "@apollo/client";
import { updateVote } from "../graphql/mutation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  Box,
  Hidden,
  Switch,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import CustomTextField from "./CustomTextField";
import ControlledSwitch from "./ControlledSwitch";
import VoteEditCandidates from "./VoteEditCandidates";
import {
  VoteEditFormdata,
  VoteMetadata,
  Image,
  File as File2,
  Post,
} from "../types";
import { voteOptions } from "../helpers/options";
import { makeUpdateVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";
import SavedImageFile from "./SavedImageFile";

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

export default function VoteEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [insert] = useMutation(updateVote);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const [isBinary, setBinary] = React.useState(false);
  const formControl = useForm<VoteEditFormdata>();
  const { handleSubmit, register, errors, reset, control } = formControl;
  const classes = useStyles();
  React.useEffect(() => {
    const { title, body, context, files, images, candidates} = p;
    // const candidates = cs.map((c) => c.body);
    const metadata = p.metadata as VoteMetadata;
    const {
      closingMethod,
      isBinary: binary,
      isMultiple,
      isAnonymous,
      isResultHidden,
    } = metadata;
    reset({
      title,
      body,
      context,
      closingMethod,
      isMultiple,
      isAnonymous,
      isResultHidden,
      candidates,
    });
    setBinary(binary);
    setImages2(images);
    setFiles2(files);
  }, [reset, p]);
  async function handleForm(form: VoteEditFormdata) {
    setLoading(true);
    const {
      closingMethod,
      candidates,
      isMultiple,
      isAnonymous,
      isResultHidden,
      ...rest
    } = form;
    const metadata = {
      isBinary,
      isMultiple,
      isAnonymous,
      isResultHidden,
      closingMethod,
    };
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
      metadata,
    });

    await insert({ variables });
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
              register={register}
              errors={errors}
            />
            <CustomTextField
              register={register}
              errors={errors}
              select
              label="투표 종료 방법"
              variant="filled"
              name="closingMethod"
              SelectProps={{
                native: true,
              }}
              defaultValue="7days"
              children={voteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            />
            <Grid container justify="space-between" alignItems="center">
              찬반투표
              <Switch
                color="primary"
                checked={isBinary}
                onChange={() => setBinary(!isBinary)}
              />
            </Grid>
            <VoteEditCandidates formControl={formControl} isBinary={isBinary} />
            <CustomImageUploader setImageArr={setImageArr} />
            <Grid container justify="space-between" alignItems="center">
              <Typography>익명투표</Typography>
              <ControlledSwitch control={control} name="isAnonymous" />
            </Grid>
            <Grid container justify="space-between" alignItems="center">
              <Typography>중복투표</Typography>
              <ControlledSwitch control={control} name="isMultiple" />
            </Grid>
            <Grid container justify="space-between" alignItems="center">
              <Typography>종료 될 때까지 중간 투표 집계를 숨깁니다.</Typography>
              <ControlledSwitch control={control} name="isResultHidden" />
            </Grid>
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <SavedImageFile
              files={files2}
              images={images2}
              setFiles={setFiles2}
              setImages={setImages2}
            />
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
