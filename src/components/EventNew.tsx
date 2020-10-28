import React from "react";
import { useCurrentUser, useSuccess } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import { Container, Typography, Box } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { EventFormdata } from "../types";
import EventInputs from "./EventInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
import { makeNewVariables } from "./makePostVariables";
import { firestore } from "../config/firebase";
export default function EventNew() {
  const { board_id, group_id } = useParams<{
    board_id: string;
    group_id: string;
  }>();
  const history = useHistory();
  const [, setSuccess] = useSuccess();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [currentUser] = useCurrentUser();
  const formControl = useForm<EventFormdata>();
  const { handleSubmit } = formControl;
  async function handleForm(form: EventFormdata) {
    const { event_date, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      event_date: new Date(event_date),
      deadline: new Date(deadline),
      countPeople,
      place,
    };
    const variables = await makeNewVariables(rest, {
      board_id,
      group_id,
      imageArr,
      fileArr,
      setSuccess,
      metadata,
      created_by: currentUser?.uid,
      updated_by: currentUser?.uid,
      name: currentUser?.displayName ?? currentUser?.email,
      count_like: 0,
      count_comment: 0,
      count_view: 0,
      is_closed: false,
      updated_at: new Date(),
      created_at: new Date(),
      type: "event",
    });
    const doc = await firestore.collection("posts").add(variables);
    history.push("/post/" + doc.id);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Box mt={2}>
        <Container>
          <Typography variant="h2">모임</Typography>
          <EventInputs formControl={formControl} />
          <ImageFileDropzone
            images={imageArr}
            setImages={setImageArr}
            files={fileArr}
            setFiles={setFileArr}
          />
          <BtnSubmitDesktop text="모임 생성" />
        </Container>
      </Box>
    </form>
  );
}
