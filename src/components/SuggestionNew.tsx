import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import { suggestionOptions } from "../helpers/options";
import CustomTextField from "./CustomTextField";
import { makeNewVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
interface Formdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
}
export default function SuggestionNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [insert] = useMutation(insertPost);
  const [address, setAddress] = React.useState("");
  const [latLng, setLatLng] = React.useState<undefined | any>(undefined);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const { handleSubmit, register, errors } = useForm<Formdata>();
  const classes = useStyles();

  async function handleForm(form: Formdata) {
    setLoading(true);
    const { closingMethod, ...rest } = form;
    const metadata = { closingMethod, address };
    const variables = await makeNewVariables(rest, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
      metadata,
    });
    if (latLng) {
      const { lat, lng } = latLng;
      const location = {
        type: "Point",
        coordinates: [lng, lat],
      };
      variables.location = location;
    }
    const res = await insert({ variables });
    const id = res?.data?.insert_mx_posts_one?.id;
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <Hidden mdUp>
          <HeaderNew title="제안글 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">제안글 쓰기</Typography>
            <CustomTextField
              label="제목"
              name="title"
              autoFocus
              register={register}
              errors={errors}
            />
            <CustomTextField
              label="제안 배경"
              multiline
              name="context"
              register={register}
              errors={errors}
            />
            <CustomTextField
              select
              label="제안 종료 방법"
              variant="filled"
              name="closingMethod"
              SelectProps={{ native: true }}
              defaultValue="30days"
              children={suggestionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            />
            <CustomTextField
              label="내용"
              multiline
              name="body"
              register={register}
              errors={errors}
            />

            <GooglePlaceAutocomplete
              address={address}
              setAddress={setAddress}
              latLng={latLng}
              setLatLng={setLatLng}
            />
            <CustomImageUploader setImageArr={setImageArr} />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <Hidden smDown implementation="css">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                제안 제출
              </Button>
            </Hidden>
          </Container>
        </Box>
      </form>
    </>
  );
}
