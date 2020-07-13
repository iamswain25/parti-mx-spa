import React from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  like: {
    fontSize: 12,
    letterSpacing: -0.33,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: "solid",
  },
}));
export default function BtnLike({ count = 0 }) {
  const classes = useStyles();
  return (
    <Box>
      <Button
        variant="contained"
        className={classes.like}
        startIcon={<FavoriteIcon className={classes.icon} />}
      >
        공감 {count}
      </Button>
    </Box>
  );
}
