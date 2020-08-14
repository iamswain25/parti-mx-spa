import React from "react";
import {
  IconButton,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { File } from "../types";
import filesize from "filesize";
const useStyles = makeStyles((theme) => {
  return {
    root: { marginTop: theme.spacing(2) },
    padding: { padding: theme.spacing(1) },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    hover: {
      paddingLeft: theme.spacing(1),
      backgroundColor: theme.palette.grey[100],
      // "&:hover": {
      //   backgroundColor: theme.palette.grey[200],
      // },
    },
    closePic: {
      right: 0,
      position: "absolute",
      cursor: "pointer",
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: "rgba(0, 0, 0, 0.74)",
      borderRadius: 0,
      color: "white",
    },
    img: { objectFit: "cover", width: "100%", height: "100%" },
  };
});
export default function SavedFile(props: { files: File[]; setFiles: any }) {
  const { files, setFiles } = props;
  const classes = useStyles();
  function fileRemove(i: number) {
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles([...newFiles]);
  }
  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Grid container className={classes.padding}>
        Saved Files
      </Grid>
      <Grid container className={classes.padding} spacing={1}>
        {files.map((f, i) => (
          <Grid container item key={i}>
            <Grid
              container
              item
              key={i}
              wrap="nowrap"
              alignItems="center"
              justify="space-between"
              className={classes.hover}
            >
              <div className={classes.flex}>
                {/* <AttachFileIcon /> */}
                {f.name}
                <Typography
                  variant="subtitle2"
                  style={{ paddingLeft: 8 }}
                  color="textSecondary"
                >
                  {filesize(f.size)}
                </Typography>
              </div>
              <IconButton onClick={() => fileRemove(i)}>
                <CloseIcon color="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
