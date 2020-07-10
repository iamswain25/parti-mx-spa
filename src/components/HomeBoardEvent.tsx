import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import BoardPostVEvent from "./BoardPostEvent";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        border: `1px solid ${grey[300]}`,
        maxWidth: 364,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
      backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    postContainer: {
      overflow: "hidden",

      display: "grid",
      gridGap: theme.spacing(1.5),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function HomeBoardEvent({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <>
      <section className={classes.container}>
        <Box borderBottom={isDesktop ? 1 : 0} borderColor="grey.400">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.titleContainer}
          >
            <Typography variant={isDesktop ? "h2" : "h3"} color="textPrimary">
              <Box ml={isDesktop ? 2 : 0} fontWeight="bold">{b.title}</Box>
            </Typography>
            {isDesktop && (
              <Box mr={1}>
                <BoardMoreTag to={`/home/${b.id}`} />
              </Box>
            )}
          </Grid>
        </Box>
        <div className={classes.postContainer}>
          {b.posts.map((p, i) => (
            <BoardPostVEvent key={i} post={p} />
          ))}
        </div>
        {!isDesktop && <BoardMoreTag to={`/home/${b.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
