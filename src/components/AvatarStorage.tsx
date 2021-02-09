import React from "react";
import { Avatar, AvatarTypeMap } from "@material-ui/core";
import useStoragePath from "../store/useStoragePath";
import { Img } from "../types";
export default function AvatarStorage(
  props: AvatarTypeMap<{ obj: Img }>["props"],
) {
  const { obj, ...prop } = props;
  const src = useStoragePath(obj?.path);
  return <Avatar {...prop} src={src} />;
}
