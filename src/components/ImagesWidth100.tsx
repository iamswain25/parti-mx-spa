import React from "react";
import { Img } from "../types";
import StorageImage from "./StorageImage";

export default function ImagesWidth100({ images = [] }: { images: Img[] }) {
  if (!images?.length) {
    return null;
  }
  return (
    <>
      {images?.map((p, i) => {
        return <StorageImage key={i} image={p} />;
      })}
    </>
  );
}
