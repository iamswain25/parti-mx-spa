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
    | { className?: string; image: Img; thumb?: boolean }
    | { className?: string; path: string }
) {
  let path = "path" in props ? props.path : props.image?.path;
  const classes = useStyles();
  const className = props.className
    ? `${classes.root} ${props.className}`
    : classes.root;
  if ("thumb" in props && props?.thumb) {
    const arr = path?.split("/");
    const img = arr.pop();
    arr.push("thumbs", img + "_364x240");
    path = arr.join("/");
  }

  const src = useStoragePath(path);
  if ("image" in props && !props.image) {
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
        <img {...imageProps} className={className} alt={path} />
      )}
    />
  );
}
