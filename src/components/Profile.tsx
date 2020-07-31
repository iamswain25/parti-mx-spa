import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { useStore } from "../store/store";
import { updateUserName } from "../graphql/mutation";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
import HeaderBack from "./HeaderBack";
import { ValidateResult } from "react-hook-form/dist/types/form";
import { searchDuplicateNameWithoutMine } from "../graphql/query";
import { whoami } from "../graphql/query";
import CloseIcon from "@material-ui/icons/Close";
import useErrorEffect from "./useErrorEffect";
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
  username: string;
  bgFiles: any;
}
export default function Profile() {
  const classes = useStyles();
  const [{ user_id }] = useStore();
  const history = useHistory();
  const [updateName] = useMutation(updateUserName);
  const [photo, setPhoto] = React.useState<undefined | string>(undefined);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const { handleSubmit, register, errors, reset } = useForm<GroupForm>();
  const { refetch } = useQuery(searchDuplicateNameWithoutMine, {
    fetchPolicy: "network-only",
  });
  const { data, error } = useQuery(whoami, {
    variables: { id: user_id },
  });
  useErrorEffect(error);
  React.useEffect(() => {
    if (data?.mx_users_by_pk) {
      const { photo_url, name } = data?.mx_users_by_pk;
      reset({ username: name });
      setPhoto(photo_url);
    }
  }, [data, reset, setPhoto]);
  async function handleForm(form: GroupForm) {
    const { bgFiles, username } = form;
    setLoading(true);
    const variables = { id: user_id, name: username, photo_url: undefined };
    if (bgFiles && bgFiles.length) {
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
        <TextField
          label="닉네임"
          inputRef={register({
            validate: async function (value): Promise<ValidateResult> {
              const res = await refetch({ name: value, id: user_id });
              if (res.data?.mx_users?.length) {
                return `이미 사용중인 닉네임 입니다.`;
              }
              return undefined;
            },
          })}
          name="username"
          variant="outlined"
          margin="normal"
          fullWidth
          required={errors.username ? true : false}
          error={errors.username ? true : false}
          helperText={errors.username && errors.username.message}
        />
      </Container>
      <BtnSubmitDesktop text="수정" />
    </form>
  );
}
