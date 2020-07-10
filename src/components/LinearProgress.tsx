import { LinearProgress, withStyles, Theme } from "@material-ui/core";
const LinearProgressActive = withStyles((theme: Theme) => ({
  root: {
    height: 8,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: "solid",
  },
  bar: {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.dark,
  },
}))(LinearProgress);
const LinearProgressGrey = withStyles((theme: Theme) => ({
  root: {
    height: 8,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: "solid",
  },
  bar: {
    borderRadius: 4,
    backgroundColor: "#a9aaad",
  },
}))(LinearProgress);
export { LinearProgressGrey, LinearProgressActive };
