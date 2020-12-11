import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import BoardPostNotice from "./BoardPostNotice";
import {
  Typography,
  Grid,
  Box,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import useDesktop from "./useDesktop";
import RouteBoardAnnounce from "./RouteBoardAnnounce";
import usePosts from "../store/usePosts";
import ButtonBoardType from "./ButtonBoardType";
import { useSort } from "../store/useGlobalState";
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
  const [sort] = useSort();
  const [posts] = usePosts({ board_id: b.id, sort });
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
        <ButtonBoardType />
      </Grid>
      <Grid container spacing={isDesktop ? 3 : 0} direction="row-reverse">
        <Grid item xs={12} md={4}>
          <Box
            border={isDesktop ? 1 : 2}
            borderColor={isDesktop ? "grey.300" : "primary.main"}
            mt={isDesktop ? 2 : 0}
            mb={isDesktop ? 0 : 2}
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
        </Grid>
        <Grid item xs={12} md={8}>
          <Box paddingX={isDesktop ? 0 : 2}>
            {posts.map((p, i) => (
              <BoardPostNotice key={p.id} post={p} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </section>
  );
}
