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
  smallIcon: {
    padding: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "inherit",
    color: theme.palette.grey[300],
    "&.active": {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
    "& svg": {
      width: 13,
      height: 13,
    },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[300],
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {},
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
  container: {
    [theme.breakpoints.up("md")]: {
      maxWidth: 1200,
      paddingLeft: 30,
      paddingRight: 30,
      margin: "0 auto",
    },
  },
  titleContainer: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  img: {
    objectFit: "cover",
    maxHeight: "100%",
    width: "100%",
  },
  aspectRatio: {
    display: "flex",
    "&::before": {
      content: "''",
      paddingBottom: "100%",
      display: "inline-block",
      verticalAlign: "top",
    },
  },
  photoGrid: {
    display: "grid",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: 8,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
  },
}));
