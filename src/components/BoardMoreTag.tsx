import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    link: {
      textDecoration: "none",
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
      },
    },
  };
});
export default function BoardMoreTag({ to = "/" }: { to: string }) {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link}>
      <Typography variant={"body2"}>더 보기</Typography>
      <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
    </Link>
  );
}
