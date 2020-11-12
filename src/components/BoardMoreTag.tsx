import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    link: {
      display: "flex",
      height: 28,
      padding: "6px 12px",
      borderRadius: 2,
      border: "solid 1px rgba(143, 138, 191, 0.6)",
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      "&>.title": {
        fontSize: 11,
        color: "#544f85",
      },
      "&>.svg": {
        width: theme.spacing(2),
        height: theme.spacing(2),
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(2),
      },
    },
  };
});
export default function BoardMoreTag({
  to = "/",
  label,
}: {
  to: string;
  label?: string;
}) {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link}>
      <div className="title">{label} 모두 보기</div>
      <ChevronRightIcon className="svg" />
    </Link>
  );
}
