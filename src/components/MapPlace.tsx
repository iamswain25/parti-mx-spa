import React from "react";
import { ChildComponentProps } from "google-map-react";
import PlaceIcon from "@material-ui/icons/Place";
import { IconButton } from "@material-ui/core";
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
export default function MapPlace(props: ChildComponentProps & {selected: boolean}) {
  const style = props.$hover || props.selected ? greatPlaceStyleHover : greatPlaceStyle;
  return (
    <IconButton style={style}>
      <PlaceIcon />
    </IconButton>
  );
}
