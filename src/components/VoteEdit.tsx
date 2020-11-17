import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";

import { deletingIds } from "./VoteEditCandidates";
import {
  VoteEditFormdata,
  VoteMetadata,
  Img,
  File as File2,
  Post,
} from "../types";
import SavedImageFile from "./SavedImageFile";
import VoteInputs from "./VoteInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import useCandidates from "../store/useCandidates";

export default function VoteEdit({ post: p }: { post: Post }) {
  const { id, title, body, context, files, images, html } = p;
  const metadata = p.metadata as VoteMetadata;
  const {
    closingMethod,
    isBinary: binary,
    isMultiple,
    isAnonymous,
    isResultHidden,
  } = metadata;
  const history = useHistory();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const [isBinary, setBinary] = React.useState(binary);
  const [candidates] = useCandidates({ post_id: p.id });
  const formControl = useForm<VoteEditFormdata>({
    defaultValues: {
      title,
      body,
      html,
      isHtml: !!html,
      context,
      closingMethod,
      isMultiple,
      isAnonymous,
      isResultHidden,
      tags: p.tags,
    },
  });
  const { handleSubmit, reset } = formControl;

  React.useEffect(() => {
    deletingIds.length = 0;
  }, []);

  React.useEffect(() => {
    reset({ candidates });
  }, [reset, candidates]);

  async function handleForm(form: VoteEditFormdata) {
    // const {
    //   closingMethod,
    //   candidates: inputCandidates,
    //   isMultiple,
    //   isAnonymous,
    //   isResultHidden,
    //   ...rest
    // } = form;
    // const candidates = inputCandidates
    //   ? inputCandidates?.map((c, i) => {
    //       const { id, ...rest } = c;
    //       const newC: any = { ...rest, post_id: p.id, order: i + 1 };
    //       if (typeof id === "number") {
    //         newC.id = id;
    //       }
    //       return newC;
    //     })
    //   : p.candidates.map((p) => {
    //       const { id, body, order } = p;
    //       return { id, body, order, post_id: p.id };
    //     });

    // const metadata = {
    //   isBinary,
    //   isMultiple,
    //   isAnonymous,
    //   isResultHidden,
    //   closingMethod,
    // };
    // const variables = await makeUpdateVariables(rest, {
    //   imageArr,
    //   fileArr,
    //   images2,
    //   files2,
    //   setSuccess,
    //   id,
    //   metadata,
    //   candidates,
    //   deletingIds,
    // });

    // await update({ variables });
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
