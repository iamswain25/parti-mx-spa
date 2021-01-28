import React from "react";
import { Board, Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Divider } from "@material-ui/core";
import BoardPostEvent from "./BoardPostEvent";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import { useGroupId } from "../store/useGlobalState";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      // paddingBottom: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
        border: `1px solid ${grey[300]}`,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    postContainer: {
      overflow: "hidden",
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        // paddingRight: theme.spacing(2),
      },
    },
    mobileMore: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    divider: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      marginTop: theme.spacing(1),
      borderTopColor: theme.palette.divider,
    },
  };
});

export default function HomeBoardEvent2({
  board: b,
  posts,
}: {
  board: Board;
  posts: Post[];
}) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [group_id] = useGroupId();
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
          <Typography variant="h2" color="textPrimary">
            <Box ml={isDesktop ? 2 : 0} fontWeight="bold">
              {b.title}
            </Box>
          </Typography>
          {isDesktop && (
            <Box mr={1}>
              <BoardMoreTag to={`/${group_id}/${b.id}`} />
            </Box>
          )}
        </Grid>
        {isDesktop && <Divider light />}
        <div className={classes.postContainer}>
          <Grid container direction="column" spacing={2}>
            {posts?.map((p, i) => (
              <Grid item key={p.id}>
                <BoardPostEvent post={p} />
                {posts.length !== i + 1 && <hr className={classes.divider} />}
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
