import React from "react";
import { ChildComponentProps } from "google-map-react";
import PlaceIcon from "@material-ui/icons/Place";
import { IconButton } from "@material-ui/core";
import { Post } from "../types";
import SquarePhotoSmall from "./SquarePhotoSmall";
const K_SIZE = 40;

const greatPlaceStyle = {
  position: "absolute",
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  backgroundColor: "#ffffff",
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#009062",
  borderRadius: K_SIZE,
  textAlign: "center",
  color: "#009062",
  fontSize: 16,
  padding: 4,
  cursor: "pointer",
} as React.CSSProperties;

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  backgroundColor: "#009062",
  color: "#ffffff",
};
export default function MapPost(
  props: ChildComponentProps & { post: Post; selected: boolean },
) {
  const {
    post: { type },
  } = props;
  const [normal] = React.useMemo(() => {
    let borderColor = "#008083";
    let color = "#008083";
    switch (type) {
      case "suggestion":
        borderColor = "#008083";
        color = "#008083";
        return [{ ...greatPlaceStyle, borderColor, color }];
      case "notice":
        borderColor = "#01babd";
        color = "#01babd";
        return [{ ...greatPlaceStyle, borderColor, color }];
      case "vote":
        borderColor = "#f7a17e";
        color = "#f7a17e";
        return [{ ...greatPlaceStyle, borderColor, color }];
      case "event":
        borderColor = "#aed9bb";
        color = "#aed9bb";
        return [{ ...greatPlaceStyle, borderColor, color }];
    }
  }, [type]);
  const style = props.$hover || props.selected ? greatPlaceStyleHover : normal;
  return (
    <div className="info-window" id={props.post.id}>
      <IconButton style={style}>
        <PlaceIcon />
      </IconButton>
      {props.selected && <SquarePhotoSmall p={props.post} />}
    </div>
  );
}
