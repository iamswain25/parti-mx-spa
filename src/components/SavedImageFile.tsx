import React from "react";
import { File, Img } from "../types";
import SavedFile from "./SavedFile";
import SavedImage from "./SavedImage";
export default function SavedImageFile(props: {
  files?: File[];
  setFiles: any;
  images?: Img[];
  setImages: any;
}) {
  const { files, images, setFiles, setImages } = props;

  return (
    <>
      {files && <SavedFile files={files} setFiles={setFiles} />}
      {images && <SavedImage images={images} setImages={setImages} />}
    </>
  );
}
