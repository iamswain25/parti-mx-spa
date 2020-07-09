import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => {
  return {
    greyBg: {
      backgroundColor: grey[300],
      paddingTop: theme.spacing(1),
    },
  };
});

export default function GreyDivider() {
  const classes = useStyles();
  return <hr className={classes.greyBg} />;
}
