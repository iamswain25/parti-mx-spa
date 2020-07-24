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
import { EventFormdata } from "../types";
import { getDatetimeFormat } from "../helpers/datefns";
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
const now = getDatetimeFormat(new Date());
export default function EventNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [insert] = useMutation(insertPost);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const { handleSubmit, register, errors } = useForm<EventFormdata>();
  const classes = useStyles();
  async function handleForm(form: EventFormdata) {
    setLoading(true);
    const { eventDate, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      eventDate,
      deadline,
      countPeople,
      place,
    };
    const variables = await makeNewVariables(rest, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
      metadata,
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
          <HeaderNew title="모임" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">모임</Typography>
            <CustomTextField
              label="모임명"
              name="title"
              autoFocus
              register={register}
              errors={errors}
            />
            <CustomTextField
              label="일시"
              name="eventDate"
              type="datetime-local"
              defaultValue={now}
              autoFocus
              register={register}
              errors={errors}
            />
            <CustomTextField
              label="장소"
              name="place"
              autoFocus
              register={register}
              errors={errors}
            />
            <CustomTextField
              label="모집인원"
              name="countPeople"
              type="number"
              defaultValue={10}
              autoFocus
              InputProps={{
                endAdornment: <span>명</span>,
              }}
              inputRef={register({
                required: "필수 입력",
                min: {
                  value: 1,
                  message: "모집 최소 인원은 1명 입니다.",
                },
              })}
              errors={errors}
            />
            <CustomTextField
              label="신청마감일"
              name="deadline"
              type="datetime-local"
              defaultValue={now}
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
                모임
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
