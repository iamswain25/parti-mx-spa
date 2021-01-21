import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, LinearProgress, Grid } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
import BoardPostNotice from "./BoardPostNotice";
import SquarePhoto from "./SquarePhoto";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
      },
      paddingBottom: theme.spacing(5),
    },
    titleContainer: {
      borderBottom: "1px solid " + theme.palette.grey[400],
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      "&>.flex-end": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
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
  };
});

export default function HomeBoardNotice({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [group_id] = useGroupId();
  const [posts] = usePosts({ board_id: b.id, limit: 4 });
  if (posts === undefined) {
    return <LinearProgress />;
  }
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant="h2" color="textPrimary">
            <Box fontWeight="bold">{b?.title}</Box>
          </Typography>
          <div className="flex-end">
            {isDesktop && <BoardMoreTag to={`/${group_id}/${b.id}`} />}
          </div>
        </Grid>
        <Box mt={2}>
          {b?.view === "large" ? (
            <Grid container spacing={isDesktop ? 3 : 0}>
              {posts?.map(p => (
                <SquarePhoto key={p.id} p={p} xs={12} sm={6} md={3} />
              ))}
            </Grid>
          ) : (
            <div>
              {posts?.map(p => (
                <BoardPostNotice key={p.id} post={p} view={b?.view} />
              ))}
            </div>
          )}
        </Box>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
