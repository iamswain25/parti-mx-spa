import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { firestore, uploadFileByPath } from "../config/firebase";
import CloseIcon from "@material-ui/icons/Close";
import useGroup from "../store/useGroup";
import StorageImage from "./StorageImage";

import { useError, useGroupId } from "../store/useGlobalState";

const useStyles = makeStyles((theme) => ({
  root: { flex: 1 },
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    alignItems: "flex-start",
  },
}));
interface GroupForm {
  title: string;
  bgFiles: any;
  mbFiles: any;
}
export default function GroupEdit() {
  const classes = useStyles();
  const history = useHistory();
  const [groupId] = useGroupId();
  const [images, setImages] = React.useState<any>({});
  const [, setError] = useError();
  const { handleSubmit, register, errors, reset, control } = useForm<
    GroupForm
  >();
  const [group] = useGroup();
  React.useEffect(() => {
    if (group) {
      const { title, bg_img, mb_img } = group;
      setImages({ bg_img, mb_img });
      reset({ title } as GroupForm);
    }
  }, [group, reset, setImages]);
  async function handleForm(form: GroupForm) {
    const { bgFiles = [null], mbFiles = [null], title } = form;
    try {
      const bg_img = bgFiles[0]
        ? await uploadFileByPath(bgFiles[0], `groups/${groupId}/bg_img`)
        : group?.bg_img;
      const mb_img = mbFiles[0]
        ? await uploadFileByPath(mbFiles[0], `groups/${groupId}/mb_img`)
        : group?.mb_img;
      const data = { title } as any;
      if (bg_img) data.bg_img = bg_img;
      if (bg_img) data.mb_img = mb_img;
      console.log(data);
      await firestore
        .collection("groups")
        .doc(groupId)
        .set(data, { merge: true });
      history.replace(`/${groupId}`);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      noValidate
      autoComplete="off"
      className={classes.root}
    >
      <Typography variant="h3" color="textPrimary">
        그룹 정보 수정
      </Typography>
      <Controller
        name="title"
        defaultValue=""
        control={control}
        rules={{ required: "필수입력" }}
        as={
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="그룹 명"
            autoFocus
          />
        }
      />
      <div>
        <div>데스크탑 배너 이미지 (1140 X 260)</div>
        {images.bg_img ? (
          <div className={classes.flex}>
            <IconButton
              onClick={() => setImages({ ...images, bg_img: undefined })}
            >
              <CloseIcon />
            </IconButton>
            <StorageImage image={images.bg_img} />
          </div>
        ) : (
          <>
            <Typography color="error">{errors?.bgFiles?.message}</Typography>
            <input type="file" name="bgFiles" ref={register} />
          </>
        )}
      </div>
      <div>
        <div>모바일 배너 이미지 (360 X 180)</div>
        {images.mb_img ? (
          <div className={classes.flex}>
            <IconButton
              onClick={() => setImages({ ...images, mb_img: undefined })}
            >
              <CloseIcon />
            </IconButton>
            <StorageImage image={images.mb_img} />
          </div>
        ) : (
          <>
            <Typography color="error">{errors?.mbFiles?.message}</Typography>
            <input type="file" name="mbFiles" ref={register} />
          </>
        )}
      </div>
      <BtnSubmitDesktop text="저장" />
    </form>
  );
}
