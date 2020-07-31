import React from "react";
import { File, Image } from "../types";
import { Box, Grid, makeStyles, IconButton } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ImagesWidth100 from "./ImagesWidth100";
const useStyles = makeStyles((theme) => {
  return {
    image: {
      display: "grid",
      gridGap: "10px",
      gridAutoFlow: "row",
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
  images?: Image[];
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
        <div className={classes.image}>
          <ImagesWidth100 images={images} />
        </div>
      )}
    </>
  );
}
