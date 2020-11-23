import React from "react";
import {
  Box,
  makeStyles,
  Avatar,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import useUser from "../store/useUser";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  p: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
export default function AvatarNameVote({ user_id }: { user_id: string }) {
  const [user] = useUser({ id: user_id });
  const { name = "로딩중", photo_url = "로딩중" } = user || {};
  console.log(name);
  const classes = useStyles();
  return (
    <Typography variant="h4">
      <Grid container alignItems="center" className={classes.p}>
        <Box display="flex" alignItems="center">
          <Avatar
            alt={name || "익명"}
            src={photo_url}
            className={classes.small}
          />
          <Box ml={1} fontWeight={500} color="grey.900">
            {name || "익명"}
          </Box>
        </Box>
      </Grid>
      <Divider />
    </Typography>
  );
}
