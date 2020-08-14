import React from "react";
import { useMutation } from "@apollo/client";
import { updateVote } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import { deletingIds } from "./VoteEditCandidates";
import {
  VoteEditFormdata,
  VoteMetadata,
  Image,
  File as File2,
  Post,
} from "../types";
import { makeUpdateVariables } from "./makePostVariables";
import SavedImageFile from "./SavedImageFile";
import VoteInputs from "./VoteInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";

export default function VoteEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updateVote);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const [isBinary, setBinary] = React.useState(false);
  const formControl = useForm<VoteEditFormdata>();
  const { handleSubmit, reset } = formControl;

  React.useEffect(() => {
    deletingIds.length = 0;
    const { title, body, context, files, images, candidates } = p;
    const metadata = p.metadata as VoteMetadata;
    const {
      closingMethod,
      isBinary: binary,
      isMultiple,
      isAnonymous,
      isResultHidden,
    } = metadata;
    reset({
      title,
      body,
      context,
      closingMethod,
      isMultiple,
      isAnonymous,
      isResultHidden,
      candidates,
    });
    setBinary(binary);
    setImages2(images);
    setFiles2(files);
  }, [reset, p]);
  async function handleForm(form: VoteEditFormdata) {
    setLoading(true);
    const {
      closingMethod,
      candidates: inputCandidates,
      isMultiple,
      isAnonymous,
      isResultHidden,
      ...rest
    } = form;
    const candidates = inputCandidates
      ? inputCandidates?.map((c, i) => {
          const { id, ...rest } = c;
          const newC: any = { ...rest, post_id: p.id, order: i + 1 };
          if (typeof id === "number") {
            newC.id = id;
          }
          return newC;
        })
      : p.candidates.map((p) => {
          const { id, body, order } = p;
          return { id, body, order, post_id: p.id };
        });

    const metadata = {
      isBinary,
      isMultiple,
      isAnonymous,
      isResultHidden,
      closingMethod,
    };
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
      metadata,
      candidates,
      deletingIds,
    });

    await update({ variables });
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="투표 쓰기" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">투표 쓰기</Typography>
            <VoteInputs
              formControl={formControl}
              isBinary={isBinary}
              setBinary={setBinary}
              isEdit={true}
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
            <BtnSubmitDesktop text="투표 수정" />
          </Container>
        </Box>
      </form>
    </>
  );
}
