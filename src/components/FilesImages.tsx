import React from "react";
import { File, Image } from "../types";
import { Grid, makeStyles, IconButton, Typography } from "@material-ui/core";
import ImagesWidth100 from "./ImagesWidth100";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import GetAppIcon from "@material-ui/icons/GetApp";
import filesize from "filesize";
import { downloadFileDirectly } from "../helpers/download";
const useStyles = makeStyles((theme) => {
  return {
    grid: {
      display: "grid",
      gridGap: "10px",
      gridAutoFlow: "row",
      [theme.breakpoints.up("md")]: {
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
      },
      // [theme.breakpoints.down("sm")]: {
      //   paddingTop: theme.spacing(2),
      //   paddingBottom: theme.spacing(2),
      // },
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    hover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
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
      <div className={classes.grid}>
        {files?.map((f, i) => {
          return (
            <Grid
              container
              key={i}
              wrap="nowrap"
              alignItems="center"
              justify="space-between"
              className={classes.hover}
            >
              <div className={classes.flex}>
                <AttachFileIcon />
                {f.name}
                <Typography
                  variant="subtitle2"
                  style={{ paddingLeft: 4 }}
                  color="textSecondary"
                >
                  {filesize(f.size)}
                </Typography>
              </div>
              <IconButton onClick={() => downloadFileDirectly(f.uri, f.name)}>
                <GetAppIcon />
              </IconButton>
            </Grid>
          );
        })}
        {images?.length && <ImagesWidth100 images={images} />}
      </div>
    </>
  );
}
