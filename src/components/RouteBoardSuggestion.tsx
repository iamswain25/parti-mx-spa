import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import RoutePostSuggestion from "./RoutePostSuggestion";
import usePosts from "../store/usePosts";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[300]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function RouteBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [posts] = usePosts({ board_id: b.id });
  return (
    <section className={classes.container}>
      {posts?.map((p) => (
        <RoutePostSuggestion key={p.id} post={p} />
      ))}
    </section>
  );
}
