import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Grid, IconButton, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
export default function Dropzone(props: { files: File[]; setFiles: any }) {
  const { setFiles, files } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
      console.log(files);
    },
    [setFiles, files]
  );
  function remove(i: number) {
    files.splice(i, 1);
    setFiles([...files]);
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Box>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        Upload your file by clicking or dragging
      </Container>
      <Box>
        {files.map((f, i) => (
          <Grid container key={i} alignItems="center">
            {f.name} {f.size}
            <IconButton onClick={() => remove(i)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
