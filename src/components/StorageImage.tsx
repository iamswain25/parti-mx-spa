import { makeStyles } from "@material-ui/core";
import React from "react";
import { LazyImage } from "react-lazy-images";
import useStoragePath from "../store/useStoragePath";
import { Img } from "../types";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.grey[100],
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.up("md")]: {},
    },
  };
});
export default function StorageImage(
  props:
    | { className?: string; image: Img }
    | { className?: string; path: string }
) {
  const path = "path" in props ? props.path : props.image?.path;
  const className = props.className;
  const classes = useStyles();
  const src = useStoragePath(path);
  if (!src) {
    return <div className={`${classes.root} ${className}`} />;
  }
  return (
    <LazyImage
      src={src}
      placeholder={({ ref }) => (
        <div ref={ref} className={`${classes.root} ${className}`} />
      )}
      actual={({ imageProps }) => (
        <img
          {...imageProps}
          className={` ${classes.root} ${className}`}
          alt={path}
        />
      )}
    />
  );
}
