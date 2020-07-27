import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { useStore } from "../store/store";
import { updateGroup } from "../graphql/mutation";
import { queryGroupEdit } from "../graphql/query";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
import { HomeGroup } from "../types";
import Forbidden from "./Forbidden";
import CloseIcon from "@material-ui/icons/Close";
import { Img } from "react-image";

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
  id: number;
  title: string;
  bgFiles: any;
  mbFiles: any;
}
export default function GroupEdit() {
  const classes = useStyles();
  const [{ group_id, user_id }] = useStore();
  const history = useHistory();
  const [update] = useMutation(updateGroup);
  const [images, setImages] = React.useState<any>({});
  const { data, loading } = useQuery<HomeGroup>(queryGroupEdit, {
    variables: { group_id, user_id, isAnonymous: !user_id },
  });
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setError] = useGlobalState(keys.ERROR);
  const { handleSubmit, register, errors, reset, control } = useForm<
    GroupForm
  >();
  const group = data?.mx_groups_by_pk;
  React.useEffect(() => {
    if (group) {
      const { title, bg_img_url, mb_img_url, id } = group;
      setImages({ bg_img_url, mb_img_url });
      reset({ title, id });
    }
  }, [group, reset, setImages]);
  if (loading) {
    return null;
  }
  if (group?.users?.[0]?.status !== "organizer") {
    return <Forbidden />;
  }

  async function handleForm(form: GroupForm) {
    const { bgFiles = [null], mbFiles = [null], title, id } = form;
    try {
      setLoading(true);
      const bg_img_url = bgFiles[0]
        ? await uploadFileByPath(bgFiles[0], `${group_id}/bg_img_url`)
        : group?.bg_img_url;
      const mb_img_url = mbFiles[0]
        ? await uploadFileByPath(mbFiles[0], `${group_id}/mb_img_url`)
        : group?.mb_img_url;
      const variables = { bg_img_url, mb_img_url, title, group_id: id };
      await update({ variables });
      history.replace("/home");
    } catch (error) {
      setError(error);
    }
  }
  console.log(images);
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
          그룹 정보 수정
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
        <Controller
          name="id"
          control={control}
          defaultValue={group.id}
          as={<input type="hidden" />}
        />
        <div>
          <div>데스크탑 배너 이미지 (1140 X 260)</div>
          {images.bg_img_url ? (
            <Container>
              <IconButton
                onClick={() => setImages({ ...images, bg_img_url: undefined })}
              >
                <CloseIcon />
              </IconButton>
              <Img src={[images.bg_img_url]} />
            </Container>
          ) : (
            <>
              <Typography color="error">{errors?.bgFiles?.message}</Typography>
              <input type="file" name="bgFiles" ref={register} />
            </>
          )}
        </div>
        <div>
          <div>모바일 배너 이미지 (360 X 180)</div>
          {images.mb_img_url ? (
            <Container>
              <IconButton
                onClick={() => setImages({ ...images, mb_img_url: undefined })}
              >
                <CloseIcon />
              </IconButton>
              <Img src={[images.mb_img_url]} />
            </Container>
          ) : (
            <>
              <Typography color="error">{errors?.mbFiles?.message}</Typography>
              <input type="file" name="mbFiles" ref={register} />
            </>
          )}
        </div>
      </Container>
      <BtnSubmitDesktop text="저장" />
    </form>
  );
}
