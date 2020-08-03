import React from "react";
import { Image } from "../types";
import { IconButton } from "@material-ui/core";
import Viewer from "react-viewer";
import { Img } from "react-image";

export default function ImagesWidth100({ images = [] }: { images: Image[] }) {
  const [activeIndex, setVisible] = React.useState<null | number>(null);
  if (!images?.length) {
    return null;
  }
  return (
    <>
      <Viewer
        visible={activeIndex !== null}
        onClose={() => setVisible(null)}
        onMaskClick={() => setVisible(null)}
        rotatable={false}
        scalable={false}
        zIndex={2000}
        activeIndex={activeIndex ?? 0}
        // downloadable
        // downloadInNewWindow
        // noToolbar
        // noNavbar
        images={images.map((i) => ({ src: i.uri, alt: i.name || i.type }))}
      />

      {images?.map((p, i) => {
        return (
          <IconButton
            disableRipple
            key={i}
            onClick={() => setVisible(i)}
            style={{ padding: 0 }}
          >
            <Img src={p.uri} />
          </IconButton>
        );
      })}
    </>
  );
}
