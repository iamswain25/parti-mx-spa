import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
import SquarePhoto from "./SquarePhoto";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(5),
    },
    titleContainer: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
      "&>.space-between": {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
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
    photoGrid: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
      },
    },
    mobileMore: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function HomeBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [posts] = usePosts({ board_id: b.id });
  const [group_id] = useGroupId();
  const randomPosts = React.useMemo(() => {
    if (posts) {
      if (posts.length > 3) {
        const set = new Set<number>();
        while (set.size < 3) {
          set.add(Math.floor(Math.random() * posts.length));
        }
        return Array.from(set).map((index) => posts[index]);
        // return posts?.sort(() => Math.random() - Math.random())?.slice(0, 3);
      } else {
        return posts;
      }
    }
    return [];
  }, [posts]);
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
        <Grid
          container
          spacing={isDesktop ? 3 : 0}
          className={classes.photoGrid}
        >
          {randomPosts.map((p) => (
            <SquarePhoto key={p.id} p={p} xs={12} md={4} />
          ))}
        </Grid>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      <GreyDivider />
    </>
  );
}
