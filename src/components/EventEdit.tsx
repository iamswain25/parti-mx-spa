import React from "react";
import { useForm } from "react-hook-form";
import { Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
import { getDatetimeFormat } from "../helpers/datefns";
import { firestore } from "../config/firebase";

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
      deadline: getDatetimeFormat(metadata.deadline.toDate(), 0),
      event_date: getDatetimeFormat(metadata.event_date.toDate(), 0),
    },
  });
  const { handleSubmit } = formControl;

  async function handleForm(form: EventFormdata) {
    const { event_date, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      event_date: new Date(event_date),
      deadline: new Date(deadline),
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
    await firestore.collection("posts").doc(id).update(variables);
    history.push("/post/" + id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Box mt={2}>
        <Typography variant="h2">모임 수정</Typography>
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
      </Box>
    </form>
  );
}
