import React from "react";
import { HomeGroup } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
const useStyles = makeStyles((theme) => {
  return {
    gridTab: {
      overflowX: "scroll",
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
      "&.ontop": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    tab: {
      height: 48,
      overflow: "unset",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.2,
      textAlign: "center",
      display: "flex",
      flexWrap: "nowrap",
    },
    tabLink: {
      "&.active": {
        color: "black",
        borderBottomWidth: 2,
        borderBottomColor: grey[900],
        borderBottomStyle: "solid",
        "&.ontop": {
          color: "white",
          borderBottomWidth: 2,
          borderBottomColor: "white",
          borderBottomStyle: "solid",
        },
      },
      "&.ontop": {
        color: "rgba(255, 255, 255, 0.6)",
      },
      color: "rgba(0, 0, 0, 0.6)",
      textDecoration: "none",
      // maxWidth: 150,
      minWidth: 72,
      padding: theme.spacing(2),
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };
});

export default function BoardTabNavigator({ data }: { data?: HomeGroup }) {
  const classes = useStyles();
  const { boards } = data?.mx_groups_by_pk ?? {};
  const [isTop, setTop] = React.useState(false);
  const stickyHeader = React.useRef(null);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y === 0;
      if (isShow !== isTop) setTop(isShow);
    },
    [isTop],
    stickyHeader,
    false
  );
  return (
    <Grid
      container
      className={`${classes.gridTab} ${isTop ? "ontop" : ""}`}
      ref={stickyHeader}
    >
      <div className={classes.tab}>
        <NavLink exact to={`/home`} className={classes.tabLink}>
          홈
        </NavLink>
        {boards?.map((b, i) => (
          <NavLink to={`/home/${b.id}`} key={i} className={classes.tabLink}>
            {b.title}
          </NavLink>
        ))}
      </div>
    </Grid>
  );
}
