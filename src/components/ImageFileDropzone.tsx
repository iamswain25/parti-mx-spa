import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Grid,
  IconButton,
  Paper,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import filesize from "filesize";
import SortableList from "./SortableList";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
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
    },
  };
});
export default function ImageFileDropzone(props: {
  files: File[];
  setFiles: any;
  images: any;
  setImages: any;
}) {
  const { setFiles, files, images, setImages } = props;
  const classes = useStyles();
  const onFileDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [setFiles, files]
  );
  const onImageDrop = useCallback(
    (acceptedFiles) => {
      const _images = acceptedFiles.map((f: File & { preview: string }) => {
        f.preview = URL.createObjectURL(f);
        return f;
      });
      setImages([...images, ..._images]);
    },
    [setImages, images]
  );
  function fileRemove(i: number) {
    files.splice(i, 1);
    setFiles([...files]);
  }
  function imageRemove(i: number) {
    images.splice(i, 1);
    setImages([...images]);
  }
  const filesDrop = useDropzone({ onDrop: onFileDrop });
  const imagesDrop = useDropzone({ onDrop: onImageDrop, accept: "image/*" });
  function onSortEnd({ oldIndex, newIndex }: SortEnd) {
    setImages(arrayMove(images, oldIndex, newIndex));
  }
  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        className={classes.padding}
      >
        <Grid item {...imagesDrop.getRootProps()}>
          <input {...imagesDrop.getInputProps()} />
          <Button
            startIcon={<ImageIcon />}
            variant="contained"
            disableElevation
          >
            Attach Images
          </Button>
        </Grid>
        <Grid item {...filesDrop.getRootProps()}>
          <input {...filesDrop.getInputProps()} />
          <Button
            startIcon={<AttachFileIcon />}
            variant="contained"
            disableElevation
          >
            Attach Files
          </Button>
        </Grid>
      </Grid>

      {Boolean(images?.length) && (
        <>
          <Divider />
          <SortableList
            items={images}
            imageRemove={imageRemove}
            axis="x"
            onSortEnd={onSortEnd}
            useDragHandle
          />
        </>
      )}
      {Boolean(files?.length) && (
        <>
          <Divider />
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
        </>
      )}
    </Paper>
  );
}
