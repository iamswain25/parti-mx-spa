import React from "react";
import { File, Image } from "../types";
import { Box, Grid, makeStyles, IconButton } from "@material-ui/core";
import ImageCarousel from "./ImageCarousel";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
const useStyles = makeStyles((theme) => {
  //   const colors = {
  //     emerald: theme.palette.primary.dark,
  //     grey900: theme.palette.grey[900],
  //   };
  return {
    image: {
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
  };
});
export default function FilesImages(props: {
  files?: File[];
  images: Image[];
}) {
  const { files, images } = props;
  const classes = useStyles();
  return (
    <>
      {files?.length && (
        <Box className={classes.image}>
          {files.map((f, i) => {
            return (
              <Grid container key={i} alignItems="center">
                <IconButton href={f.uri} target="_blank">
                  <CloudDownloadIcon />
                </IconButton>
                {f.name}
              </Grid>
            );
          })}
        </Box>
      )}
      {images?.length && (
        <Box className={classes.image}>
          <ImageCarousel images={images} />
        </Box>
      )}
    </>
  );
}
