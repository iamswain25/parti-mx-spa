import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import BoardPostNotice from "./BoardPostNotice";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {},
    },
  };
});

export default function HomeBoardNotice({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [group_id] = useGroupId();
  const [posts] = usePosts({ board_id: b.id });
  const slicedPosts = React.useMemo(() => {
    posts?.sort((a, b) => {
      if (a.is_announced && b.is_announced) {
        return a.created_at > b.created_at ? -1 : 1;
      } else {
        if (b.is_announced) {
          return 1;
        } else if (a.is_announced) {
          return -1;
        } else {
          return a.created_at > b.created_at ? -1 : 1;
        }
      }
    });
    return posts?.slice(0, 3);
  }, [posts]);
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
            <Box fontWeight="bold">{b?.body}</Box>
          </Typography>
          {isDesktop && <BoardMoreTag to={`/${group_id}/${b?.id}`} />}
        </Grid>
        <div>
          {slicedPosts?.map((p) => (
            <BoardPostNotice key={p.id} post={p} />
          ))}
        </div>
        {!isDesktop && <BoardMoreTag to={`/${group_id}/${b?.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
