import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { updateUserName } from "../graphql/mutation";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
import HeaderBack from "./HeaderBack";
import { ValidateResult } from "react-hook-form";
import { searchDuplicateNameWithoutMine } from "../graphql/query";
import { whoami } from "../graphql/query";
import CloseIcon from "@material-ui/icons/Close";
import { client } from "../config/ApolloSetup";
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
  bgFiles: any;
}
export default function Profile() {
  const classes = useStyles();
  const [{ user_id }] = useStore();
  const history = useHistory();
  const [updateName] = useMutation(updateUserName);
  const [photo, setPhoto] = React.useState<undefined | string>(undefined);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const {
    handleSubmit,
    register,
    errors,
    reset,
    control,
  } = useForm<GroupForm>();
  React.useEffect(() => {
    client
      .query({
        query: whoami,
        variables: { id: user_id },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        if (res.data?.mx_users_by_pk) {
          const { photo_url, name, email } = res.data?.mx_users_by_pk;
          reset({ name, email });
          setPhoto(photo_url);
        }
      });
  }, [reset, setPhoto, user_id]);
  async function handleForm(form: GroupForm) {
    const { bgFiles, name } = form;
    setLoading(true);
    const variables = { id: user_id, name, photo_url: undefined };
    if (bgFiles?.length) {
      variables.photo_url = await uploadFileByPath(
        bgFiles[0],
        `profile/${user_id}`
      );
    }
    await updateName({ variables });
    history.push("/home");
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
      </Container>
      <BtnSubmitDesktop text="수정" />
    </form>
  );
}
