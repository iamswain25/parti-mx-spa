import React from "react";
import { useStore } from "../store/store";
import { useMutation } from "@apollo/client";
import { insertPost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import ImageFileDropzone from "./ImageFileDropzone";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";
import { makeNewVariables } from "./makePostVariables";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import SuggestionInputs from "./SuggestionInputs";
import { SuggestionFormdata } from "../types";
import { MINIMUM_TAG_COUNT } from "../helpers/options";

export default function SuggestionNew() {
  const { board_id } = useParams();
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setError] = useGlobalState(keys.ERROR);
  const [insert] = useMutation(insertPost);
  const [address, setAddress] = React.useState("");
  const [latLng, setLatLng] = React.useState<undefined | any>(undefined);
  const [{ group_id }] = useStore();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<SuggestionFormdata>();
  const { handleSubmit, formState } = formControl;

  async function handleForm(form: SuggestionFormdata) {
    setLoading(true);
    const { customTags, tags, ...rest } = form;
    if (imageArr.length < 1) {
      return setError("must upload minimum 1 image");
    }
    const tagSet = new Set([...tags, ...customTags]);
    const tagArr = Array.from(tagSet);
    if (tagArr.length < MINIMUM_TAG_COUNT) {
      return setError(`must select minimum ${MINIMUM_TAG_COUNT} keywords`);
    }
    const metadata = { address };
    const variables = await makeNewVariables(rest, {
      tags: tagArr,
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
          <HeaderNew title="Raising Questions" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Box my={4}>
              <Typography variant="h4">
                Share your images that depict the scene of a shift due to
                COVID19, and raise your questions that we can find mutual
                solutions. Let’s draw a common map of crisis together and figure
                out a new rule of life. <br />
                <br />
                코로나의 상황에서 변화된 일상 공간의 한 장면, 함께 답을
                찾아볼만한 질문을 공유해주세요. 위기의 지도를 만들고 그 위에서
                함께 새로운 규칙을 상상하기를 제안합니다.
              </Typography>
            </Box>
            <Typography variant="h2">
              Raising Questions :: 새롭게 맞닥뜨린 질문은 무엇인가요?
            </Typography>
            <SuggestionInputs formControl={formControl} />
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
            <BtnSubmitDesktop
              text="Submit"
              isSubmitting={formState.isSubmitting}
            />
          </Container>
        </Box>
      </form>
    </>
  );
}
