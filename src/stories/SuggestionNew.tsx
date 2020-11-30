import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box } from "@material-ui/core";
import ImageFileDropzone from "../components/ImageFileDropzone";
import BtnSubmitDesktop from "../components/BtnSubmitDesktop";
import SuggestionInputs from "../components/SuggestionInputs";
import { SuggestionFormdata } from "../types";
export default function SuggestionNew() {
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<SuggestionFormdata>();

  return (
    <>
      <form noValidate autoComplete="off">
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">전시글 쓰기</Typography>
            <Typography variant="h3" color="primary">
              전시해주신 내용은 아동의 개인정보 노출을 방지하기 위해 일부 수정될
              수 있습니다. 상세한 내용은 소식 게시판의 공지 글을 확인해주세요.
            </Typography>
            <SuggestionInputs formControl={formControl} />
            <ImageFileDropzone
              images={imageArr}
              setImages={setImageArr}
              files={fileArr}
              setFiles={setFileArr}
            />
            <BtnSubmitDesktop text="전시 제출" />
          </Container>
        </Box>
      </form>
    </>
  );
}
