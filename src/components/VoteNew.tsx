import React from "react";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import HeaderNew from "./HeaderNew";
import { VoteFormdata } from "../types";
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
  const [isBinary, setBinary] = React.useState(true);
  const formControl = useForm<VoteFormdata>({
    defaultValues: { candidates: ["", ""] } as VoteFormdata,
  });
  const { handleSubmit } = formControl;
  async function handleForm(form: VoteFormdata) {
    const {
      closingMethod,
      candidates,
      isMultiple,
      isAnonymous,
      isResultHidden,
      ...rest
    } = form;
    const metadata = {
      isBinary,
      isMultiple,
      isAnonymous,
      isResultHidden,
      closingMethod,
    };
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
    let newCandidate;
    if (isBinary) {
      newCandidate = [
        { body: "찬성", order: 1 },
        { body: "중립", order: 2 },
        { body: "반대", order: 3 },
        { body: "잘 모르겠습니다", order: 4 },
      ];
    } else {
      newCandidate = candidates.map((c, i) => ({
        body: c,
        order: i + 1,
      }));
    }
    const doc = await firestore.collection("posts").add(variables);
    await Promise.all(
      newCandidate.map((c) => doc.collection("candidates").add(c))
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
            <VoteInputs
              formControl={formControl}
              isBinary={isBinary}
              setBinary={setBinary}
            />
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
