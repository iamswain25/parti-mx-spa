import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, LinearProgress } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import BoardMoreTag from "./BoardMoreTag";
import useDesktop from "./useDesktop";
import usePosts from "../store/usePosts";
import { useGroupId } from "../store/useGlobalState";
import BoardPostNotice from "./BoardPostNotice";
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
      borderBottom: "1px solid " + theme.palette.grey[400],
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2),
      },
      "&>.space-between": {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
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
        <div>
          {posts?.map((p) => (
            <BoardPostNotice key={p.id} post={p} />
          ))}
        </div>
        <div className={classes.mobileMore}>
          <BoardMoreTag label={b?.title} to={`/${group_id}/${b.id}`} />
        </div>
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
