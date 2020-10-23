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
import ReactPlayer from "react-player";
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
  const [posts] = usePosts({ board_id: b.id });
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
          {isDesktop && <BoardMoreTag to={`/home/${b?.id}`} />}
        </Grid>
        <div className="player-wrapper">
          <ReactPlayer
            url={"https://youtu.be/XZcXKNmNcuU"}
            width="100%"
            height="100%"
            className="react-player"
            controls={true}
          />
        </div>
        <div>
          {posts.map((p) => (
            <BoardPostNotice key={p.id} post={p} />
          ))}
        </div>
        {!isDesktop && <BoardMoreTag to={`/home/${b?.id}`} />}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
