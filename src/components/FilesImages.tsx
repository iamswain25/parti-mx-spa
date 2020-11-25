import React from "react";
import { File, Img } from "../types";
import { Grid, makeStyles, IconButton, Typography } from "@material-ui/core";
import ImagesWidth100 from "./ImagesWidth100";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import GetAppIcon from "@material-ui/icons/GetApp";
import filesize from "filesize";
import { downloadFileDirectly } from "../helpers/download";
const useStyles = makeStyles((theme) => {
  return {
    flex: {
      display: "flex",
      alignItems: "center",
    },
    hover: {
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      display: "flex",
      flex: 1,
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
  };
});
export default function FilesImages(props: { files?: File[]; images: Img[] }) {
  const { files, images } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        {files?.map((f, i) => {
          return (
            <Grid container item xs={12} key={f.uri}>
              <div className={classes.hover}>
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
                <IconButton onClick={() => downloadFileDirectly(f)}>
                  <GetAppIcon />
                </IconButton>
              </div>
            </Grid>
          );
        })}
        {Boolean(images?.length) && <ImagesWidth100 images={images} />}
      </Grid>
    </>
  );
}
