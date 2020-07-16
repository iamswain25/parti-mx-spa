import React from "react";
import { Image } from "../types";
import { Box, makeStyles } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import Viewer from "react-viewer";
import "react-multi-carousel/lib/styles.css";
const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.up("md")]: {
      // display: "flex",
      maxHeight: 400,
    },
  },
  img: {
    objectFit: "contain",
    maxHeight: 400,
    width: "100%",
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {},
  },
}));
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 960, min: 0 },
    items: 1,
  },
};
export default function ImageCarousel({ images = [] }: { images: Image[] }) {
  const classes = useStyles();
  const [activeIndex, setVisible] = React.useState<null | number>(null);
  if (!images?.length) {
    return null;
  }
  return (
    <Box className={classes.grid}>
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
      <Carousel responsive={responsive} centerMode={true}>
        {images.map((image, i) => (
          <Box key={i} onClick={() => setVisible(i)}>
            <img
              src={image.uri}
              className={classes.img}
              alt={JSON.stringify(image)}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
