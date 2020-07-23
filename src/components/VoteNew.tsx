import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertVote } from "../graphql/mutation";
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
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import CustomTextField from "./CustomTextField";
import VoteNewCandidates from "./VoteNewCandidates";
import { VoteFormdata } from "../types";
import { voteOptions } from "../helpers/options";
import { makeNewVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";

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

export default function VoteNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [insert] = useMutation(insertVote);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [isBinary, setBinary] = React.useState(false);
  const formControl = useForm<VoteFormdata>({
    defaultValues: { candidates: ["", ""] },
  });
  const { handleSubmit, register, errors } = formControl;
  const classes = useStyles();

  async function handleForm(form: VoteFormdata) {
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
    const variables = await makeNewVariables(rest, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
      metadata,
    });

    if (isBinary) {
      variables.candidates = [
        { body: "찬성", order: 1 },
        { body: "중립", order: 2 },
        { body: "반대", order: 3 },
        { body: "잘 모르겠습니다", order: 4 },
      ];
    } else {
      variables.candidates = candidates.map((c, i) => ({
        body: c,
        order: i + 1,
      }));
    }
    const res = await insert({ variables });
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
            <VoteNewCandidates formControl={formControl} isBinary={isBinary} />
            <CustomImageUploader setImageArr={setImageArr} />
            <Grid container justify="space-between" alignItems="center">
              <Typography>익명투표</Typography>
              <Switch
                color="primary"
                name="isAnonymous"
                inputRef={register()}
              />
            </Grid>
            <Grid container justify="space-between" alignItems="center">
              <Typography>중복투표</Typography>
              <Switch color="primary" name="isMultiple" inputRef={register()} />
            </Grid>
            <Grid container justify="space-between" alignItems="center">
              <Typography>종료 될 때까지 중간 투표 집계를 숨깁니다.</Typography>
              <Switch
                color="primary"
                name="isResultHidden"
                inputRef={register()}
              />
            </Grid>
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
