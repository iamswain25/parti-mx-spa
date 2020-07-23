import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import {
  Post,
  Image,
  File as File2,
  LatLng,
  SuggestionMetadata,
  SuggestionFormdata,
} from "../types";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import SavedImageFile from "./SavedImageFile";
import CustomTextField from "./CustomTextField";
import { makeUpdateVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";
import { suggestionOptions } from "../helpers/options";

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

export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [address, setAddress] = React.useState<undefined | string>(undefined);
  const [latLng, setLatLng] = React.useState<undefined | LatLng>(undefined);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const { handleSubmit, register, errors, reset } = useForm<
    SuggestionFormdata
  >();
  React.useEffect(() => {
    const { location, title, body, context, files, images } = p;
    const metadata = p.metadata as SuggestionMetadata;
    reset({ title, body, context, closingMethod: metadata.closingMethod });
    setImages2(images);
    setFiles2(files);
    setAddress(metadata?.address);

    if (location) {
      const {
        coordinates: [lng, lat],
      } = location;
      setLatLng({ lng, lat });
    }
  }, [reset, p]);
  const classes = useStyles();

  async function handleForm(form: SuggestionFormdata) {
    setLoading(true);
    const { closingMethod, ...rest } = form;
    const metadata = { closingMethod, address };
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
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
    await update({ variables });
    history.push("/post/" + id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate>
      <Hidden mdUp>
        <HeaderNew title="제안글 수정" />
      </Hidden>
      <Box mt={2}>
        <Container component="main" maxWidth="md">
          <Typography variant="h2">제안글 수정</Typography>
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
          <SavedImageFile
            files={files2}
            images={images2}
            setFiles={setFiles2}
            setImages={setImages2}
          />
          <Hidden smDown implementation="css">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              제안 수정
            </Button>
          </Hidden>
        </Container>
      </Box>
    </form>
  );
}
