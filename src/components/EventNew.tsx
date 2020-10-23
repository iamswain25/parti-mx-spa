import React from "react";
import useGroupId from "../store/useGroupId";

import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import { EventFormdata } from "../types";
import EventInputs from "./EventInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import ImageFileDropzone from "./ImageFileDropzone";
export default function EventNew() {
  const { board_id } = useParams<{ board_id: string }>();
  const history = useHistory();

  const [groupId] = useGroupId();
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<EventFormdata>();
  const { handleSubmit } = formControl;
  async function handleForm(form: EventFormdata) {
    const { event_date, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      event_date,
      deadline,
      countPeople,
      place,
    };
    // const variables = await makeNewVariables(rest, {
    //   board_id,
    //   group_id,
    //   imageArr,
    //   fileArr,
    //   setSuccess,
    //   metadata,
    // });
    // const res = await insert({
    //   variables,
    // });
    // const id = res?.data?.insert_mx_posts_one?.id;
    // history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="모임" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
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
    </>
  );
}
