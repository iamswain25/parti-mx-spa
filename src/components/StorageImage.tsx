import { makeStyles } from "@material-ui/core";
import React from "react";
import { LazyImage } from "react-lazy-images";
import useStoragePath from "../store/useStoragePath";
import { Img } from "../types";
const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.grey[200],
      border: `solid 1px ${theme.palette.grey[300]}`,
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.up("md")]: {},
    },
  };
});
export default function StorageImage(
  props:
    | { className?: string; image?: Img; thumb?: boolean }
    | { className?: string; path: string },
) {
  let path = "path" in props ? props.path : props.image?.path;
  const classes = useStyles();
  const className = props.className
    ? `${classes.root} ${props.className}`
    : classes.root;
  const src = useStoragePath(path, "thumb" in props ? props.thumb : false);
  if ("image" in props && !props.image) {
    return (
      <div className={className}>
        <img src="/ogp.png" alt="defaultPng" />
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
        <img {...imageProps} className={className} alt={path} />
      )}
    />
  );
}
