import React from "react";
import { Box, IconButton, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { File } from "../types";
export default function SavedFile(props: { files: File[]; setFiles: any }) {
  const { files, setFiles } = props;
  function remove(i: number) {
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles([...newFiles]);
  }
  return (
    <Box>
      이미 저장된 파일
      {files.map((f, i: number) => (
        <Grid container key={i} alignItems="center">
          {f.name} {f.size}
          <IconButton onClick={() => remove(i)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      ))}
    </Box>
  );
}
