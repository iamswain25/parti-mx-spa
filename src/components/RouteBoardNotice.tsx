import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import BoardPostNotice from "./BoardPostNotice";
import { Typography, Grid, Box, Divider, Hidden } from "@material-ui/core";
import useDesktop from "./useDesktop";
import PostSort from "./PostSort";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        maxWidth: 1200,
        paddingLeft: 30,
        paddingRight: 30,
        margin: "0 auto",
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default function RouteBoardNotice({ board: b }: { board?: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant={isDesktop ? "h4" : "h5"} color="textPrimary">
              소식
            </Typography>
            <Box mr={1} />
            <Typography variant={isDesktop ? "h4" : "h5"} color="primary">
              {b?.posts_aggregate.aggregate.count}
            </Typography>
          </Box>
          <PostSort />
        </Grid>
        <Box display="flex">
          <Box paddingX={isDesktop ? 0 : 2} flex={1}>
            {b?.posts.map((p, i) => (
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
              <Box padding={2}>
                {b?.posts
                  .filter((p) =>
                    "announcement" in p.metadata
                      ? p.metadata.announcement
                      : false
                  )
                  .map((p, i) => (
                    <BoardPostNotice key={i} post={p} />
                  ))}
              </Box>
            </Box>
          </Hidden>
        </Box>
      </section>
    </>
  );
}
