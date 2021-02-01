import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Box,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useSort } from "../store/useGlobalState";
import BoardPostNotice from "./BoardPostNotice";
import RouteBoardAnnounce from "./RouteBoardAnnounce";
import PostSort from "./PostSort";
import SquarePhoto from "./SquarePhoto";
const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
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
    },
  };
});

export default function RouteBoardNotice({ board: b }: { board: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  const [sort] = useSort();
  const [posts] = usePosts({ board_id: b.id, sort });
  const announcedPosts = posts?.filter(p => p.is_announced);
  const showAnnouncement = announcedPosts && announcedPosts?.length > 0;
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
      <Grid container direction="row-reverse" spacing={isDesktop ? 3 : 0}>
        <Grid item xs={12} md={4}>
          {showAnnouncement && (
            <Box
              border={isDesktop ? 1 : 2}
              borderColor={isDesktop ? "grey.300" : "primary.main"}
              mt={isDesktop ? 2 : 0}
              mb={2}
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
              <Grid
                container
                spacing={isDesktop ? 2 : 0}
                className={classes.announcement}
              >
                {announcedPosts?.map(p => (
                  <RouteBoardAnnounce post={p} key={p.id} />
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Box width="100%" mt={isDesktop ? 3 : 0}>
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
        </Grid>
      </Grid>
    </section>
  );
}
