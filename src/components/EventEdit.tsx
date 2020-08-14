import React from "react";
import { useMutation } from "@apollo/client";
import { updatePost } from "../graphql/mutation";
import { useForm } from "react-hook-form";
import { Container, Typography, Box, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HeaderNew from "./HeaderNew";
import { useGlobalState, keys } from "../store/useGlobalState";
import Dropzone from "./Dropzone";
import { Post, Image, File as File2, EventFormdata } from "../types";
import SavedImageFile from "./SavedImageFile";
import { makeUpdateVariables } from "./makePostVariables";
import CustomImageUploader from "./CustomImageUploader";
import EventInputs from "./EventInputs";
import BtnSubmitDesktop from "./BtnSubmitDesktop";

export default function EventEdit({ post: p }: { post: Post }) {
  const { id } = p;
  const history = useHistory();
  const [, setLoading] = useGlobalState(keys.LOADING);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [update] = useMutation(updatePost);
  const [imageArr, setImageArr] = React.useState<File[]>([]);
  const [fileArr, setFileArr] = React.useState<File[]>([]);
  const [images2, setImages2] = React.useState<Image[] | undefined>(undefined);
  const [files2, setFiles2] = React.useState<File2[] | undefined>(undefined);
  const { handleSubmit, register, errors, reset } = useForm<EventFormdata>();
  React.useEffect(() => {
    const { title, body, files, images, metadata } = p;
    reset({ title, body, ...metadata });
    setImages2(images);
    setFiles2(files);
  }, [reset, p]);

  async function handleForm(form: EventFormdata) {
    setLoading(true);
    const { eventDate, deadline, countPeople, place, ...rest } = form;
    const metadata = {
      eventDate,
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
    const res = await update({
      variables,
    });
    console.log(res);
    history.push("/post/" + id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Hidden mdUp>
          <HeaderNew title="EDit" />
        </Hidden>
        <Box mt={2}>
          <Container component="main" maxWidth="md">
            <Typography variant="h2">Edit</Typography>
            <EventInputs register={register} errors={errors} />
            <CustomImageUploader setImageArr={setImageArr} />
            <Dropzone files={fileArr} setFiles={setFileArr} />
            <SavedImageFile
              files={files2}
              images={images2}
              setFiles={setFiles2}
              setImages={setImages2}
            />
            <BtnSubmitDesktop text="Edit" />
          </Container>
        </Box>
      </form>
    </>
  );
}
