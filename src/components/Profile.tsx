import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import CloseIcon from "@material-ui/icons/Close";
import { useCurrentUser, useGroupId } from "../store/useGlobalState";
import { auth, firestore, storage, uploadFileByPath } from "../config/firebase";
import useAccountDelete from "../store/useAccountDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    flex: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  btn: {
    position: "absolute",
    right: 0,
    top: -theme.spacing(3),
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginTop: theme.spacing(4),
  },
  exit: {
    // color: theme.palette.primary.main,
    justifyContent: "flex-end",
    display: "flex",
  },
}));
interface GroupForm {
  name: string;
  email: string;
  bgFiles: any;
}
export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [photo, setPhoto] = React.useState<null | string>(null);
  const [group_id] = useGroupId();
  const deleteAccount = useAccountDelete();
  const {
    handleSubmit,
    register,
    errors,
    control,
    reset,
  } = useForm<GroupForm>();
  React.useEffect(() => {
    if (currentUser) {
      setPhoto(currentUser.photoURL);
      reset({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      } as GroupForm);
    }
  }, [currentUser, reset, setPhoto]);

  async function handleForm(form: GroupForm) {
    const { bgFiles, name } = form;
    const variables = { displayName: name, photoURL: photo };
    const variables2 = { name, photo_url: photo };
    if (bgFiles?.length) {
      const path = `users/${currentUser?.uid}`;
      await uploadFileByPath(bgFiles[0], path);
      variables.photoURL = await storage.ref(path).getDownloadURL();
      variables2.photo_url = variables.photoURL;
    }
    const p1 = auth.currentUser?.updateProfile(variables);
    const p2 = firestore
      .doc(`users/${currentUser?.uid}`)
      .set({ ...variables2, updated_at: new Date() }, { merge: true });
    await Promise.all([p1, p2]);
    setCurrentUser({ ...currentUser, ...variables } as firebase.User);
    history.push(`/${group_id}`);
  }
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      noValidate
      autoComplete="off"
      className={classes.root}
    >
      <h1>프로필 수정</h1>
      {photo ? (
        <div className={classes.flex}>
          <Avatar alt="photo_url" src={photo} className={classes.large} />
          <IconButton
            classes={{ root: classes.btn }}
            onClick={() => setPhoto(null)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        <>
          <Typography color="error">{errors?.bgFiles?.message}</Typography>
          <input type="file" name="bgFiles" ref={register} />
        </>
      )}
      <Controller
        control={control}
        name="name"
        defaultValue=""
        as={
          <TextField
            label="닉네임"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            required
            error={errors.name ? true : false}
            helperText={errors.name && errors.name.message}
          />
        }
        rules={{
          required: "닉네임을 입력해야 합니다.",
        }}
      />
      <Controller
        control={control}
        name="email"
        defaultValue=""
        as={
          <TextField
            disabled
            label="이메일"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            required
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
        }
      />
      <BtnSubmitDesktop text="수정" />
      {currentUser?.email && (
        <div className={classes.exit}>
          <Button variant="outlined" color="primary" onClick={deleteAccount}>
            멤버탈퇴
          </Button>
        </div>
      )}
    </form>
  );
}
