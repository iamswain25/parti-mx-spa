import React from "react";
import { IconButton, Grid, makeStyles, Paper } from "@material-ui/core";
import { Image } from "../types";
import CloseIcon from "@material-ui/icons/Close";
import { Img } from "react-image";
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
export default function SavedImage(props: { images: Image[]; setImages: any }) {
  const { images, setImages } = props;
  const classes = useStyles();
  function imageRemove(i: number) {
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages([...newImages]);
  }
  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Grid container className={classes.padding}>
        Saved Images
      </Grid>
      <Grid container spacing={1} className={classes.padding}>
        {images.map((f: any, i: number) => (
          <Grid
            item
            key={i}
            style={{ width: 76, height: 76, position: "relative" }}
          >
            <Img src={[f.uri]} className={classes.img} />
            <IconButton
              onClick={() => imageRemove(i)}
              className={classes.closePic}
            >
              <CloseIcon color="inherit" />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
