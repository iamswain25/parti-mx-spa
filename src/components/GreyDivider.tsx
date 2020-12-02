import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Theme } from "@material-ui/core";
const useStyles = makeStyles<Theme, { height: number }>((theme) => {
  return {
    greyBg: ({ height = 1 }) => ({
      backgroundColor: grey[300],
      paddingTop: theme.spacing(height),
    }),
  };
});
export default function GreyDivider({ height = 1 }) {
  const classes = useStyles({ height });
  return <hr className={classes.greyBg} />;
}
