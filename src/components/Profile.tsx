import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import CloseIcon from "@material-ui/icons/Close";
import { useCurrentUser, useGroupId } from "../store/useGlobalState";
import { auth, firestore, storage, uploadFileByPath } from "../config/firebase";
import useAccountDelete from "../store/useAccountDelete";
import useUser from "../store/useUser";
import { SIGNUP_AREA, SIGNUP_CITIES } from "../helpers/options";
import { User } from "../types";
import firebase from "firebase";
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
interface GroupForm extends User {
  name: string;
  email: string;
  bgFiles: any;
  address: string;
}
export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [me] = useUser({ id: currentUser?.uid });
  const [photo, setPhoto] = React.useState<null | string>(null);
  const [group_id] = useGroupId();
  const deleteAccount = useAccountDelete();
  const {
    handleSubmit,
    register,
    errors,
    control,
    reset,
    watch,
  } = useForm<GroupForm>();
  const area = watch("area");
  React.useEffect(() => {
    if (me) {
      setPhoto(me.photo_url);
      reset(me as GroupForm);
    }
  }, [reset, setPhoto, me]);

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
          validate: async (value: string) => {
            const res = await firestore
              .collection("users")
              .where("name", "==", value)
              .get();
            if (res.docs.length > 1) {
              return "이미 사용 중인 닉네임입니다.";
            } else if (res.docs.length === 1) {
              if (res.docs[0].id !== currentUser?.uid) {
                return "이미 사용 중인 닉네임입니다.";
              }
            }
          },
        }}
      />
      <Controller
        control={control}
        name="area"
        defaultValue="경기도"
        rules={{ required: "필수 선택" }}
        as={
          <TextField
            select
            variant="outlined"
            margin="normal"
            fullWidth
            label="거주지 광역 단위"
            required
            error={!!errors.area}
            helperText={errors?.area?.message}
            children={SIGNUP_AREA.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          />
        }
      />
      {area === "경기도" && (
        <Controller
          control={control}
          name="address"
          defaultValue=""
          rules={{ required: "필수 선택" }}
          as={
            <TextField
              select
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="거주지역"
              error={!!errors.address}
              helperText={errors?.address?.message}
              children={SIGNUP_CITIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            />
          }
        />
      )}
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
