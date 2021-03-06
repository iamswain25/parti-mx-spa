import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Grid } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { createNewGroup } from "../graphql/mutation";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";

const useStyles = makeStyles((theme) => ({
  top: {
    height: theme.mixins.toolbar.minHeight,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
  },
  grid: {
    display: "grid",
    gridGap: theme.spacing(2),
  },
}));
interface GroupForm {
  title: string;
  bgFiles: any;
  mbFiles: any;
}
export default function GroupNew() {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  const history = useHistory();
  const [create] = useMutation(createNewGroup);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const { handleSubmit, register, errors, setError } = useForm<GroupForm>();
  console.log(errors);
  async function handleForm(form: GroupForm) {
    const { bgFiles, mbFiles, title } = form;
    if (!bgFiles.length) {
      return setError("bgFiles", {
        type: "required",
        message: "데스크탑 이미지는 필수 항목 입니다.",
      });
    }
    if (!mbFiles.length) {
      return setError("mbFiles", {
        type: "required",
        message: "모바일 이미지는 필수 항목 입니다.",
      });
    }
    try {
      setLoading(true);
      const bg_img_url = await uploadFileByPath(
        bgFiles[0],
        `${group_id}/bg_img_url`
      );
      const mb_img_url = await uploadFileByPath(
        mbFiles[0],
        `${group_id}/mb_img_url`
      );
      const variables = { bg_img_url, mb_img_url, title };
      const res = await create({ variables });
      history.replace("/home?group_id=" + res.data.insert_mx_groups_one.id);
    } catch (error) {}
  }
  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Grid
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
        className={classes.top}
      >
        <Link to={`/home`}>
          <ChevronLeftIcon />
        </Link>
        <Typography variant="h3" color="textPrimary">
          새 그룹 생성
        </Typography>
        <Button type="submit" color="primary">
          저장
        </Button>
      </Grid>
      <Container maxWidth="lg" className={classes.grid}>
        <CustomTextField
          label="그룹 명"
          autoFocus
          name="title"
          register={register}
          errors={errors}
        />
        <div>
          <div>데스크탑 배너 이미지 (1140 X 260)</div>
          <Typography color="error">{errors?.bgFiles?.message}</Typography>
          <input type="file" name="bgFiles" ref={register} />
        </div>
        <div>
          <div>모바일 배너 이미지 (360 X 180)</div>
          <Typography color="error">{errors?.mbFiles?.message}</Typography>
          <input type="file" name="mbFiles" ref={register} />
        </div>
      </Container>
      <BtnSubmitDesktop text="생성" />
    </form>
  );
}
