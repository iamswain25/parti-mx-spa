import React from "react";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import HeaderNew from "./HeaderNew";
import { Candidate, VoteFormdata } from "../types";
import { makeNewVariables } from "./makePostVariables";
import VoteInputs from "./VoteInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import { useHistory, useParams } from "react-router-dom";
import { firestore } from "../config/firebase";

export default function VoteNew() {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const history = useHistory();
  const [, setSuccess] = useSuccess();
  const [currentUser] = useCurrentUser();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<VoteFormdata>({
    defaultValues: {
      candidates: [{ body: "" }, { body: "" }],
      metadata: {
        is_binary: true,
        is_result_hidden: false,
        is_anonymous: false,
        is_multiple: false,
      },
    } as VoteFormdata,
  });
  const { handleSubmit } = formControl;
  async function handleForm(form: VoteFormdata) {
    const { candidates = [], metadata, ...rest } = form;
    metadata.is_multiple = !!metadata.is_multiple;
    const variables = await makeNewVariables(rest, {
      group_id,
      board_id,
      imageArr,
      fileArr,
      setSuccess,
      metadata,
      is_closed: false,
      updated_at: new Date(),
      created_at: new Date(),
      type: "vote",
      created_by: currentUser?.uid,
      updated_by: currentUser?.uid,
    });
    if (metadata.is_binary) {
      candidates.length = 0;
      candidates.push(
        { body: "찬성", order: 1 } as Candidate,
        { body: "중립", order: 2 } as Candidate,
        { body: "반대", order: 3 } as Candidate,
        { body: "잘 모르겠습니다", order: 4 } as Candidate
      );
    }
    const doc = await firestore.collection("posts").add(variables);
    await Promise.all(
      candidates.map((c, i) =>
        doc
          .collection("candidates")
          .add({ ...c, order: i + 1, created_at: new Date() })
      )
    );

    history.push("/post/" + doc.id);
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
            <VoteInputs formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="투표 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
