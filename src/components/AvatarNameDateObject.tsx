import React from "react";
import {
  Box,
  makeStyles,
  Avatar,
  Grid,
  GridJustification,
} from "@material-ui/core";
import { semanticDate } from "../helpers/datefns";
import { User } from "../types";
const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(2),
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
  font: {
    [theme.breakpoints.up("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
}));
export default function AvatarNameDateObject({
  user,
  created_at,
  justify = "space-between",
}: {
  user: User;
  created_at?: firebase.firestore.Timestamp;
  justify?: GridJustification;
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify={justify}
      className={classes.font}
    >
      <Box display="flex" alignItems="center">
        <Avatar
          alt={user?.name}
          src={user?.photo_url}
          className={classes.small}
        />
        <Box ml={1} fontWeight={500} color="grey.900">
          {user?.name}
        </Box>
      </Box>
      <Box color="grey.600" ml={1}>
        {semanticDate(created_at)}
      </Box>
    </Grid>
  );
}
