import React from "react";
// import { useStore } from "../store/store";
// import useNavigateToPost from "./useNavigateToPost";
import { Board } from "../types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import BoardPostNotice from "./BoardPostNotice";
import { Typography, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GreyDivider from "./GreyDivider";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {},
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    flexrowcenter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  };
});
const moreTag = (
  <span>
    <Grid direction="row" container>
      <Typography variant={"body2"}>더 보기</Typography>
      <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
    </Grid>
  </span>
);
export default function HomeBoardNotice({ board: b }: { board: Board }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
          <Typography variant={isDesktop ? "h2" : "h3"}>{b.title}</Typography>
          {isDesktop && moreTag}
        </Grid>
        <div>
          {b.posts.map((p, i) => (
            <BoardPostNotice key={i} post={p} />
          ))}
        </div>
        {!isDesktop && <div className={classes.flexrowcenter}>{moreTag}</div>}
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
