import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import BoardPostNotice from "./BoardPostNotice";
import { Typography, Grid, Box, Select, MenuItem } from "@material-ui/core";
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
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
            <Typography variant={isDesktop ? "h2" : "h5"} color="textPrimary">
              {/* {b?.title} */}
              소식
            </Typography>
            <Box mr={1} />
            <Typography variant={isDesktop ? "h2" : "h5"} color="primary">
              {b?.posts_aggregate.aggregate.count}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant={isDesktop ? "h2" : "h5"} color="textPrimary">
              <Select value={10}>
                <MenuItem value={10}>최근업데이트순</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Typography>
          </Box>
        </Grid>
        <Box paddingX={isDesktop ? 0 : 2}>
          {b?.posts.map((p, i) => (
            <BoardPostNotice key={i} post={p} />
          ))}
        </Box>
      </section>
    </>
  );
}
