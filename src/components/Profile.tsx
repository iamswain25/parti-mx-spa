import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, IconButton, Avatar } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { updateUserName } from "../graphql/mutation";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { uploadFileByPath } from "../config/firebase";
import { useGlobalState, keys } from "../store/useGlobalState";
import HeaderBack from "./HeaderBack";
import { whoami } from "../graphql/query";
import CloseIcon from "@material-ui/icons/Close";
import { client } from "../config/ApolloSetup";
import CountryRegionLocal from "./CountryRegionLocal";
import { ProfileForm } from "../types";
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
interface GroupForm extends ProfileForm {
  bgFiles: any;
}
export default function Profile() {
  const classes = useStyles();
  const [{ user_id }, dispatch] = useStore();
  const history = useHistory();
  React.useEffect(() => {
    dispatch({ type: "SET_BOARD", board_id: null });
  }, [dispatch]);
  const [updateName] = useMutation(updateUserName);
  const [photo, setPhoto] = React.useState<undefined | string>(undefined);
  const [, setLoading] = useGlobalState(keys.LOADING);
  const formControl = useForm<GroupForm>();
  const { handleSubmit, register, errors, reset } = formControl;
  React.useEffect(() => {
    client
      .query({
        query: whoami,
        variables: { id: user_id },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        if (res.data?.mx_users_by_pk) {
          const { photo_url, name, metadata } = res.data?.mx_users_by_pk;
          reset({ name, ...metadata });
          setPhoto(photo_url);
        }
      });
  }, [reset, setPhoto, user_id]);
  async function handleForm(form: GroupForm) {
    const { bgFiles, name, country, region, local } = form;
    setLoading(true);
    const variables = {
      id: user_id,
      name,
      photo_url: undefined,
      metadata: { country, region, local },
    };
    // return console.log(variables);
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
      <HeaderBack title="Profile" submit="save change" />
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
        <CountryRegionLocal formControl={formControl} />
      </Container>
      <BtnSubmitDesktop text="Save Change" />
    </form>
  );
}
