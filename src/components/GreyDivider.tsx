import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => {
  return {
    greyBg: {
      backgroundColor: grey[300],
      paddingTop: (height: number) => theme.spacing(height),
    },
  };
});
export default function GreyDivider({ height = 1 }) {
  const classes = useStyles(height);
  return <hr className={classes.greyBg} />;
}
