import React from "react";
import { Box, IconButton, Grid } from "@material-ui/core";
import { Image } from "../types";
import CloseIcon from "@material-ui/icons/Close";
import { Img } from "react-image";
export default function SavedImage(props: { images: Image[]; setImages: any }) {
  const { images, setImages } = props;
  function remove(i: number) {
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages([...newImages]);
  }
  return (
    <Box>
      Saved images
      {images.map((f, i: number) => (
        <Grid container key={i} alignItems="center">
          {f.name}
          <IconButton onClick={() => remove(i)}>
            <CloseIcon />
          </IconButton>
          <Img src={[f.uri]} style={{ width: "100%" }} />
        </Grid>
      ))}
    </Box>
  );
}
