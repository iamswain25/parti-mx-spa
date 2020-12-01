import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box, LinearProgress } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
import HomeBoardPhoto from "./HomeBoardPhoto";
const useStyles = makeStyles((theme) => {
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
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      "&>.space-between": {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
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
        <div className={classes.titleContainer}>
          <Typography variant="h2" color="textPrimary">
            <Box fontWeight="bold">{b?.title}</Box>
          </Typography>
          <div className="space-between">
            <div>{b?.body}</div>
            {isDesktop && (
              <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
            )}
          </div>
        </div>
        <Grid container spacing={isDesktop ? 3 : 2}>
          {posts?.map((p) => (
            <HomeBoardPhoto key={p.id} p={p} md={3} xs={6} />
          ))}
        </Grid>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
