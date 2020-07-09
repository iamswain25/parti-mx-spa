import React from "react";
import { Board } from "../types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, useMediaQuery } from "@material-ui/core";
import BoardPostVEvent from "./BoardPostEvent";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
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
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {},
    },
    postContainer: {
      overflow: "hidden",
      backgroundColor: grey[100],
      padding: theme.spacing(2),
      display: "grid",
      gridGap: theme.spacing(1.5),
    },
  };
});
const moreTag = (
  <span>
    <Grid direction="row" container>
      <Typography variant={"body2"}>더 보기</Typography>
      <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
    </Grid>
  </span>
);
export default function HomeBoardEvent({ board: b }: { board: Board }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant={isDesktop ? "h2" : "h3"} color="textPrimary">
            <Box ml={isDesktop ? 2 : 0}>{b.title}</Box>
          </Typography>
          {isDesktop && <BoardMoreTag to={`/home/${b.id}`} />}
        </Grid>
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
