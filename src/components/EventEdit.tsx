import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import {
  Post,
  Img,
  File as File2,
  EventFormdata,
  EventMetadata,
} from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";
import EventInputs from "./EventInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import { useSuccess } from "../store/useGlobalState";

export default function EventEdit({ post: p }: { post: Post }) {
  const { id, title, body, files, images, html } = p;
  const history = useHistory();
  const [, setSuccess] = useSuccess();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Img[] | undefined>(images);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(files);
  const metadata = p.metadata as EventMetadata;
  const formControl = useForm<EventFormdata>({
    defaultValues: {
      title,
      body,
      html,
      isHtml: !!html,
      ...metadata,
      deadline: metadata.deadline.toDate(),
      event_date: metadata.event_date.toDate(),
    },
  });
  const { handleSubmit } = formControl;

  async function handleForm(form: EventFormdata) {
    const { event_date, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      event_date,
      deadline,
      countPeople,
      place,
    };
    const variables = await makeUpdateVariables(rest, {
      imageArr,
      fileArr,
      images2,
      files2,
      setSuccess,
      id,
      metadata,
    });
    console.log(variables);
    // const res = await update({
    //   variables,
    // });
    // console.log(res);
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="소식 수정" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">소식 수정</Typography>
            <EventInputs formControl={formControl} />
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
            <BtnSubmitDesktop text="모임 수정" />
          </Container>
        </Box>
      </form>
    </>
  );
}
