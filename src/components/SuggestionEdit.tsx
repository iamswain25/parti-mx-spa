import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
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
import { makeUpdateVariables } from "./makePostVariables";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import ImageFileDropzone from "./ImageFileDropzone";

export default function SuggestionEdit({ post: p }: { post: Post }) {
  const { id, location, title, body, context, files, images, tags, html } = p;
  const history = useHistory();
  const metadata = p.metadata as SuggestionMetadata;
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [address, setAddress] = React.useState<undefined | string>(
    metadata?.address
  );
  const [latLng, setLatLng] = React.useState<undefined | LatLng>(() => {
    const {
      coordinates: [lng, lat],
    } = location || { coordinates: [null, null] };
    return { lng, lat };
  });
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const formControl = useForm<SuggestionFormdata>({
    defaultValues: {
      title,
      body,
      context,
      isHtml: !!html,
      html,
      closingMethod: metadata.closingMethod,
      tags,
    },
  });
  const { handleSubmit } = formControl;

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
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Hidden mdUp>
        <HeaderNew title="제안글 수정" />
      </Hidden>
      <Box mt={2}>
        <Container component="main" maxWidth="md">
          <Typography variant="h2">제안글 수정</Typography>
          <SuggestionInputs
            formControl={formControl}
            // children={<HtmlInput formControl={formControl} />}
          />
          <GooglePlaceAutocomplete
            address={address}
            setAddress={setAddress}
            latLng={latLng}
            setLatLng={setLatLng}
          />
          <ImageFileDropzone
            images={imageArr}
            setImages={setImageArr}
            files={fileArr}
            setFiles={setFileArr}
          />
          <SavedImageFile
            files={files2}
            images={images2}
            setFiles={setFiles2}
            setImages={setImages2}
          />
          <BtnSubmitDesktop text="제안 수정" />
        </Container>
      </Box>
    </form>
  );
}
