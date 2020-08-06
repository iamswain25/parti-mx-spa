import React from "react";
import { Post } from "../types";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core";
import { Img } from "react-image";
import BoardPostSub2 from "./BoardPostSub2";
import useNavigateToPost from "./useNavigateToPost";
import ReactDOM from "react-dom";
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
  const navigatePost = useNavigateToPost(p.id);
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
      <Img
        src={[...(p.images?.map((i) => i.uri) || []), "/favicon.ico"]}
        className={classes.img}
        onClick={navigatePost}
      />
      <Box className={classes.titleContainer} onClick={navigatePost}>
        {p.title}
      </Box>
      <BoardPostSub2 post={p} />
    </div>
  );
}
