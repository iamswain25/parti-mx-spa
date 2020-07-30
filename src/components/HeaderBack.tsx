import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    top: {
      height: theme.mixins.toolbar.minHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      overflow: "hidden",
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
    },
  };
});

export default function HeaderBack({
  title = "로딩 중",
  submit = "저장",
  right,
}: {
  title: string;
  submit?: string;
  right?: any;
}) {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  return (
    <Grid
      container
      className={classes.top}
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Link to={`/home?group_id=${group_id}`}>
        <ChevronLeftIcon />
      </Link>
      <Typography variant="h3" color="textPrimary">
        {title}
      </Typography>
      {right ? (
        right
      ) : (
        <Button aria-label="submit" type="submit">
          {submit}
        </Button>
      )}
    </Grid>
  );
}
