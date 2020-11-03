import React from "react";
import { useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import HeaderNew from "./HeaderNew";
import { VoteFormdata } from "../types";
import { makeNewVariables } from "./makePostVariables";
import VoteInputs from "./VoteInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";

export default function VoteNew() {
  // const history = useHistory();
  const [, setSuccess] = useSuccess();
  // const [groupId] = useGroupId();
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
      imageArr,
      fileArr,
      setSuccess,
      metadata,
    });

    if (isBinary) {
      variables.candidates = [
        { body: "찬성", order: 1 },
        { body: "중립", order: 2 },
        { body: "반대", order: 3 },
        { body: "잘 모르겠습니다", order: 4 },
      ];
    } else {
      variables.candidates = candidates.map((c, i) => ({
        body: c,
        order: i + 1,
      }));
    }
    // const res = await insert({ variables });
    // const id = res?.data?.insert_mx_posts_one?.id;
    // history.push("/post/" + id);
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
