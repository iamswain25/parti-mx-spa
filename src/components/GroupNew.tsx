import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Grid } from "@material-ui/core";
import { useGroupId } from "../store/useGlobalState";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";

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
  const [groupId] = useGroupId();
  const history = useHistory();

  const { handleSubmit, register, errors, setError } = useForm<GroupForm>();
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
      const bg_img = await uploadFileByPath(bgFiles[0], `${groupId}/bg_img`);
      const mb_img = await uploadFileByPath(mbFiles[0], `${groupId}/mb_img`);
      console.log(bg_img, mb_img);
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
