import React from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, Box } from "@material-ui/core";
import { EventFormdata } from "../types";
import EventInputs from "../components/EventInputs";
import BtnSubmitDesktop from "../components/BtnSubmitDesktop";
import ImageFileDropzone from "../components/ImageFileDropzone";
export default function EventNew() {
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const formControl = useForm<EventFormdata>();

  return (
    <form noValidate autoComplete="off">
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
