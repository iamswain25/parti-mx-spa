import { makeStyles } from "@material-ui/core";
import React from "react";
import { LazyImage } from "react-lazy-images";
import useStoragePath from "../store/useStoragePath";
import { Img } from "../types";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.grey[100],
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.up("md")]: {},
    },
  };
});
export default function StorageThumb(props: {
  className?: string;
  image: Img;
}) {
  const classes = useStyles();
  const className = props.className
    ? `${classes.root} ${props.className}`
    : classes.root;
  const path = props.image?.path;
  let thumbPath: string | undefined;
  if (path) {
    const arr = path?.split("/");
    const img = arr.pop();
    arr.push("thumbs", img + "_364x240");
    thumbPath = arr.join("/");
  }
  const src = useStoragePath(thumbPath);
  if (!props.image) {
    return (
      <div className={className}>
        <img src="/ogp.png" alt="ogp" />
      </div>
    );
  }
  if (!src) {
    return <div className={className} />;
  }
  return (
    <LazyImage
      src={src}
      placeholder={({ ref }) => <div ref={ref} className={className} />}
      actual={({ imageProps }) => (
        <img {...imageProps} className={className} alt={thumbPath} />
      )}
    />
  );
}
