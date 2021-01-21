import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import BoardPostSuggestion from "./BoardPostSuggestion";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
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
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
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

export default function HomeBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [posts] = usePosts({ board_id: b.id, limit: 4 });
  const [group_id] = useGroupId();
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
          {isDesktop && <BoardMoreTag to={`/${group_id}/${b.id}`} />}
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2}>
            {posts?.map((p, i) => (
              <Grid item key={p.id} sm={6}>
                <BoardPostSuggestion key={i} post={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
