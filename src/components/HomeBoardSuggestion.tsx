import React from "react";
import { Board } from "../types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import BoardPostSuggestion from "./BoardPostSuggestion";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      
    },
    postContainer: {
      [theme.breakpoints.up("md")]: {
        display: "grid",
        gridTemplateColumns: "calc(50% - 12px) calc(50% - 12px)",
        gridTemplateRows: "1fr 1fr",
        paddingTop: theme.spacing(3),
      },
      gridGap: theme.spacing(3),
    },
  };
});

export default function HomeBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant={isDesktop ? "h2" : "h3"} color="textPrimary">
            {b.title}
          </Typography>
          {isDesktop && <BoardMoreTag to={`/home/${b.id}`} />}
        </Grid>
        <div className={classes.postContainer}>
          {b.posts.map((p, i) => (
            <BoardPostSuggestion key={i} post={p} />
          ))}
        </div>
        {!isDesktop && <BoardMoreTag to={`/home/${b.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
