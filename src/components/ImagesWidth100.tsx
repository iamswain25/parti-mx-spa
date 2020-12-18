import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Img } from "../types";
import StorageImage from "./StorageImage";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  img: {
    width: "100%",
  },
}));
export default function ImagesWidth100({ images = [] }: { images: Img[] }) {
  const classes = useStyles();
  if (!images?.length) {
    return null;
  }
  return (
    <>
      {images?.map((p, i) => {
        return (
          <Box key={p.path ?? p.name ?? i} className={classes.root}>
            <StorageImage image={p} className={classes.img} />
          </Box>
        );
      })}
    </>
  );
}
