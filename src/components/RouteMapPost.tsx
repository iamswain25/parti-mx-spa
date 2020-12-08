import React from "react";
import { Post } from "../types";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import StorageImage from "./StorageImage";
export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
    borderStyle: "solid",
    borderWidth: (selected) => (selected ? 2 : 1),
    borderColor: (selected) =>
      selected ? theme.palette.primary.main : theme.palette.grey[300],

    marginBottom: theme.spacing(1),
  },
  titleContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: 14,
    letterSpacing: -0.39,
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "pointer",
  },
  img: {
    width: 251,
    height: 112,
    objectFit: "cover",
    cursor: "pointer",
  },
}));

export default function RouteMapPost({
  post: p,
  selectedPlace,
}: {
  post: Post;
  selectedPlace?: Post;
}) {
  const selected = selectedPlace?.id === p.id;
  const classes = useStyles(selected);
  const divRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(
    function scrollInView() {
      if (selected) {
        const node = ReactDOM.findDOMNode(divRef.current) as Element;
        node.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    },
    [selected]
  );

  return (
    <div className={classes.container} ref={divRef}>
      <Link to={`/post/${p.id}`}>
        <StorageImage image={p.images?.[0]} className={classes.img} />
        <Box className={classes.titleContainer}>{p.title}</Box>
      </Link>
      <BoardPostSub2 post={p} />
    </div>
  );
}
