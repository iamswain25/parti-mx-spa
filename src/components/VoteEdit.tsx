import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { deletingIds } from "./VoteEditCandidates";
import { VoteFormdata, VoteMetadata, Img, File as File2, Post } from "../types";
import SavedImageFile from "./SavedImageFile";
import VoteInputs from "./VoteInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import useCandidates from "../store/useCandidates";
import { makeUpdateVariables } from "./makePostVariables";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { firestore } from "../config/firebase";

export default function VoteEdit({ post: p }: { post: Post<VoteMetadata> }) {
  const { id: post_id, files, images } = p;
  const history = useHistory();
  const [, setSuccess] = useSuccess();
  const [currentUser] = useCurrentUser();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const [candidates] = useCandidates({ post_id: p.id });
  const formControl = useForm<VoteFormdata>({
    defaultValues: { ...p, isHtml: !!p.html },
  });
  const { handleSubmit, setValue } = formControl;
  React.useEffect(() => {
    deletingIds.length = 0;
  }, []);
  React.useEffect(() => {
    setValue("candidates", candidates);
  }, [setValue, candidates]);

  async function handleForm(form: VoteFormdata) {
    const { candidates, ...rest } = form;
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      updated_at: new Date(),
      updated_by: currentUser?.uid,
    });
    const promises = [];
    const docRef = firestore.collection("posts").doc(post_id);
    const updatePost = docRef.update(variables);
    promises.push(updatePost);
    const deleteCandidate = deletingIds.map((candidate_id) =>
      docRef.collection("candidates").doc(candidate_id).delete()
    );
    promises.push(...deleteCandidate);
    const upsertCandidates = candidates.map(
      ({ id, voted, post_id, ...c }, i) => {
        if (id) {
          return docRef
            .collection("candidates")
            .doc(id)
            .update({ ...c, order: i + 1, updated_at: new Date() });
        } else {
          return docRef
            .collection("candidates")
            .add({ ...c, order: i + 1, created_at: new Date() })
            .catch(console.warn);
        }
      }
    );
    promises.push(...upsertCandidates);
    await Promise.all(promises);
    history.push("/post/" + post_id);
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
            <VoteInputs formControl={formControl} isEdit />
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
