import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Theme } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles<Theme, { height: number }>((theme) => {
  return {
    greyBg: ({ height = 1 }) => ({
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      backgroundColor: grey[300],
      paddingTop: height,
    }),
  };
});
export default function GreyDivider({ height = 1 }) {
  const classes = useStyles({ height });
  return <hr className={classes.greyBg} />;
}
