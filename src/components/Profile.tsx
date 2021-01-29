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
import UserExtraInfo from "./UserExtraInfo";
import { User } from "../types";
import useUser from "../store/useUser";

const useStyles = makeStyles(theme => ({
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
interface GroupForm extends User {
  name: string;
  email: string;
  bgFiles: any;
  age: string;
  area: string;
  address: string;
  organization: string;
}
export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [me] = useUser({ id: currentUser?.uid });
  const [photo, setPhoto] = React.useState<null | string>(null);
  const [group_id] = useGroupId();
  const deleteAccount = useAccountDelete();
  const formControl = useForm<GroupForm>();
  const { handleSubmit, register, errors, control, reset } = formControl;
  React.useEffect(() => {
    if (me) {
      setPhoto(me.photo_url);
      reset(me as GroupForm);
    }
  }, [me, reset, setPhoto]);

  async function handleForm(form: GroupForm) {
    const { bgFiles, name, ...rest } = form;
    const variables = { displayName: name, photoURL: photo };
    const variables2 = { name, ...rest, photo_url: photo };
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
            label="활동명"
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
          required: "활동명을 입력해야 합니다.",
          validate: async (value: string) => {
            const res = await firestore
              .collection("users")
              .where("name", "==", value)
              .get();
            if (res.docs.length > 1) {
              return "이미 사용 중인 활동명입니다.";
            } else if (res.docs.length === 1) {
              if (res.docs[0].id !== currentUser?.uid) {
                return "이미 사용 중인 활동명입니다.";
              }
            }
          },
        }}
      />
      <UserExtraInfo formControl={formControl} />
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
            회원탈퇴
          </Button>
        </div>
      )}
    </form>
  );
}
