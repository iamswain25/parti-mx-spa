import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    link: {
      display: "flex",
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
      <Box color="grey.600" display="flex" alignItems="center">
        <Typography variant={"body2"}>More</Typography>
        <Box fontSize={16} display="flex" alignItems="center">
          <ChevronRightIcon />
        </Box>
      </Box>
    </Link>
  );
}
