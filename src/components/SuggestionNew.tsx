import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import { makeNewVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import { SuggestionFormdata } from "../types";

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
  const formControl = useForm<SuggestionFormdata>();
  const { handleSubmit } = formControl;

  async function handleForm(form: SuggestionFormdata) {
    setLoading(true);
    const { closingMethod, tags, ...rest } = form;
    const metadata = { closingMethod, address, tags };
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
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="제안글 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">제안글 쓰기</Typography>
            <SuggestionInputs formControl={formControl} />
            <GooglePlaceAutocomplete
              address={address}
              setAddress={setAddress}
              latLng={latLng}
              setLatLng={setLatLng}
            />
            <CustomImageUploader setImageArr={setImageArr} />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <BtnSubmitDesktop text="제안 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
