import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  IconButton,
  Avatar,
  Button,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { updateUserName } from "../graphql/mutation";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { auth, uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
import HeaderBack from "./HeaderBack";
import { ValidateResult } from "react-hook-form/dist/types/form";
import { searchDuplicateNameWithoutMine } from "../graphql/query";
import { whoami } from "../graphql/query";
import CloseIcon from "@material-ui/icons/Close";
import { client } from "../config/ApolloSetup";
import firebase from "firebase";
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridGap: theme.spacing(2),
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
}));
interface GroupForm {
  name: string;
  email: string;
  org: string;
  bgFiles: any;
}
export default function Profile() {
  const classes = useStyles();
  const [{ user_id }] = useStore();
  const history = useHistory();
  const [updateName] = useMutation(updateUserName);
  const [photo, setPhoto] = React.useState<undefined | string>(undefined);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setError] = useGlobalState(keys.ERROR);
  const { handleSubmit, register, errors, reset, control } = useForm<
    GroupForm
  >();
  React.useEffect(() => {
    client
      .query({
        query: whoami,
        variables: { id: user_id },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        if (res.data?.mx_users_by_pk) {
          const { photo_url, name, email, metadata } = res.data?.mx_users_by_pk;
          reset({ name, email, org: metadata?.org || "" });
          setPhoto(photo_url);
          setLoading(false);
        }
      });
  }, [reset, setPhoto, user_id, setLoading]);
  async function handleForm(form: GroupForm) {
    const { bgFiles, name, org } = form;
    setLoading(true);
    const variables = {
      id: user_id,
      name,
      photo_url: undefined,
      metadata: { org },
    };
    if (bgFiles?.length) {
      variables.photo_url = await uploadFileByPath(
        bgFiles[0],
        `profile/${user_id}`
      );
    }
    await updateName({ variables });
    history.push("/home");
  }
  async function signoutHandler() {
    const password = window.prompt("비밀번호를 입력하세요");
    try {
      if (!auth?.currentUser) throw new Error("유저를 찾지 못했습니다.");
      if (!password) return;
      const credential = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email!,
        password
      );
      await auth.currentUser.reauthenticateWithCredential(credential);
      await auth.currentUser.delete();
    } catch (error) {
      setError(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <HeaderBack title="프로필" submit="수정" />
      <Container maxWidth="lg" className={classes.grid}>
        {photo ? (
          <div className={classes.flex}>
            <Avatar alt="photo_url" src={photo} className={classes.large} />
            <IconButton
              classes={{ root: classes.btn }}
              onClick={() => setPhoto(undefined)}
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
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          }
          rules={{
            required: "닉네임을 입력해야 합니다.",
            validate: async function (value): Promise<ValidateResult> {
              const res = await client.query({
                query: searchDuplicateNameWithoutMine,
                variables: { name: value, id: user_id },
                fetchPolicy: "network-only",
              });
              if (res.data?.mx_users?.length) {
                return `이미 사용중인 닉네임 입니다.`;
              }
              return undefined;
            },
          }}
        />
        <Controller
          control={control}
          name="org"
          defaultValue=""
          rules={{ required: true }}
          as={
            <TextField
              label="소속"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={!!errors.org}
              helperText="YWCA 회원이시면 소속을 표기해주세요. (예. OOYWCA)"
            />
          }
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
              error={!!errors.email}
            />
          }
        />
        <div>
          <Button variant="contained" color="primary" onClick={signoutHandler}>
            회원탈퇴
          </Button>
        </div>
      </Container>
      <BtnSubmitDesktop text="수정" />
    </form>
  );
}
