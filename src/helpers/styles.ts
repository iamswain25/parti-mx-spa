import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(0),
    minWidth: "auto",
    fontSize: "inherit",
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  text: {
    [theme.breakpoints.up("md")]: {
      fontSize: 14,
      letterSpacing: -0.3,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      letterSpacing: -0.26,
    },
  },
  buttons: {
    [theme.breakpoints.up("md")]: {
      fontSize: 12,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
}));
