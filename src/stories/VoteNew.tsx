import React from "react";
import { useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import HeaderNew from "./HeaderNew";
import { VoteFormdata } from "../types";
import { makeNewVariables } from "../components/makePostVariables";
import VoteInputs from "../components/VoteInputs";
import BtnSubmitDesktop from "../components/BtnSubmitDesktop";
import ImageFileDropzone from "../components/ImageFileDropzone";

export default function VoteNew() {
  // const history = useHistory();
//   const [, setSuccess] = useSuccess();
  // const [groupId] = useGroupId();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [isBinary, setBinary] = React.useState(true);
  const formControl = useForm<VoteFormdata>({
    defaultValues: { candidates: ["", ""] } as VoteFormdata,
  });

  return (
    <>
      <form noValidate autoComplete="off">
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
