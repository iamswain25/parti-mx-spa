import React from "react";
import {
  Box,
  makeStyles,
  Avatar,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { User } from "../types";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  p: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
export default function AvatarNameEmail(props: { user: User }) {
  const { name = "로딩중", photo_url = "로딩중", email } = props.user;
  const classes = useStyles();
  return (
    <Typography variant="h4">
      <Grid container alignItems="center" className={classes.p}>
        <Box display="flex" alignItems="center">
          <Avatar alt={name} src={photo_url} className={classes.small} />
          <div>
            <Box fontWeight={500}>{name}</Box>
            <Typography variant="h5" color="textSecondary">
              {email}
            </Typography>
          </div>
        </Box>
      </Grid>
      <Divider />
    </Typography>
  );
}
