import React from "react";
import {
  Box,
  makeStyles,
  Avatar,
  Grid,
  GridJustification,
} from "@material-ui/core";
import { semanticDate } from "../helpers/datefns";
import useUser from "../store/useUser";
import firebase from "firebase";
const useStyles = makeStyles((theme) => ({
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
export default function AvatarNameDate({
  user_id,
  created_at,
  count_view,
  justify = "space-between",
}: {
  user_id: string;
  created_at?: firebase.firestore.Timestamp;
  count_view?: number;
  justify?: GridJustification;
}) {
  const classes = useStyles();
  const [user] = useUser({ id: user_id });
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
        {count_view !== undefined ? <span>{` 조회 ${count_view}`}</span> : null}
      </Box>
    </Grid>
  );
}
