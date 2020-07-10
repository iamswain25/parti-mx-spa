import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    link: {
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
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
      <Box color="grey.600">
        <Typography variant={"body2"}>더 보기</Typography>
        <Box fontSize={16}>
          <ChevronRightIcon />
        </Box>
      </Box>
    </Link>
  );
}
