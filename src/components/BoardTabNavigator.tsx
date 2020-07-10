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
      boxShadow: `0 4px 2px -2px ${grey[300]}`,
      //  theme.shadows[1],
      zIndex: theme.zIndex.appBar,
      "& a": {
        color: "rgba(0, 0, 0, 0.6)",
        "&.active": {
          color: "black",
          borderBottomWidth: 2,
          borderBottomColor: "#007e55",
          borderBottomStyle: "solid",
        },
      },
      "&.ontop": {
        backgroundColor: theme.palette.primary.main,
        "& a": {
          color: "rgba(255, 255, 255, 0.6)",
          "&.active": {
            color: theme.palette.common.white,
            borderBottomColor: theme.palette.common.white,
          },
        },
      },
    },
    tab: {
      [theme.breakpoints.up("md")]: {
        maxWidth: 1200,
        width: 1200,
        padding: "0 30px",
        margin: "0 auto",
      },
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
      textDecoration: "none",
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
