import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import BoardPostNotice from "./BoardPostNotice";
import {
  Typography,
  Grid,
  Box,
  Divider,
  Hidden,
  LinearProgress,
} from "@material-ui/core";
import useDesktop from "./useDesktop";
import PostSort from "./PostSort";
import RouteBoardAnnounce from "./RouteBoardAnnounce";
import usePosts from "../store/usePosts";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
    },
    titleContainer: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    announcement: {
      padding: theme.spacing(2),
      "&>hr": {
        margin: `${theme.spacing(2)}px 0`,
        border: "none",
        borderTop: `1px solid ${theme.palette.grey[200]}`,
      },
    },
  };
});

export default function RouteBoardNotice({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [posts] = usePosts({ board_id: b.id });
  const announcedPosts = posts?.filter((p) => p.is_announced);
  if (posts === undefined) {
    return <LinearProgress />;
  }
  return (
    <section className={classes.container}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Box display="flex">
          <Typography variant="h4" color="textPrimary">
            {b.title}
          </Typography>
          <Box mr={1} />
          <Typography variant="h4" color="primary">
            {b?.count_open || 0}
          </Typography>
        </Box>
        <PostSort />
      </Grid>
      <Box display="flex">
        <Box paddingX={isDesktop ? 0 : 2} flex={1}>
          {posts.map((p, i) => (
            <BoardPostNotice key={i} post={p} />
          ))}
        </Box>
        <Hidden implementation="css" smDown>
          <Box
            width={364}
            border={1}
            borderColor="grey.300"
            mt={2}
            ml={3}
            height="fit-content"
          >
            <Box
              padding={2}
              fontSize={16}
              fontWeight={500}
              letterSpacing={0.23}
              color="grey.900"
            >
              공지
            </Box>
            <Divider />
            <div className={classes.announcement}>
              {announcedPosts
                ?.map((p) => <RouteBoardAnnounce key={p.id} post={p} />)
                ?.reduce((prev: any[], curr: any, index: number) => {
                  prev.push(curr);
                  if (index < announcedPosts?.length - 1) {
                    prev.push(<hr />);
                  }
                  return prev;
                }, [])}
            </div>
          </Box>
        </Hidden>
      </Box>
    </section>
  );
}
