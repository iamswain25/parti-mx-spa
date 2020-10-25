import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Img } from "../types";
import SortableList from "./SortableList";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
const useStyles = makeStyles((theme) => {
  return {
    root: { marginTop: theme.spacing(2) },
    padding: { padding: theme.spacing(1) },
  };
});
export default function SavedImage(props: { images: Img[]; setImages: any }) {
  const { images, setImages } = props;
  const classes = useStyles();
  function imageRemove(i: number) {
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages([...newImages]);
  }
  function onSortEnd({ oldIndex, newIndex }: SortEnd) {
    setImages(arrayMove(images, oldIndex, newIndex));
  }
  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Grid container className={classes.padding}>
        Saved Images
      </Grid>
      <SortableList
        items={images}
        imageRemove={imageRemove}
        onSortEnd={onSortEnd}
        axis="x"
        useDragHandle
      />
    </Paper>
  );
}
