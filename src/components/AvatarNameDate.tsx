import React from "react";
import {
  Box,
  makeStyles,
  Avatar,
  Grid,
  GridJustification,
} from "@material-ui/core";
import { semanticDate } from "../helpers/datefns";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
  name = "로딩중",
  photo_url = "로딩중",
  created_at = "로딩중",
  justify = "space-between",
}: {
  name?: string;
  photo_url?: string;
  created_at?: string;
  justify?: GridJustification;
}) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justify={justify}>
      <Box className={classes.font} display="flex" alignItems="center">
        <Avatar alt={name} src={photo_url} className={classes.small} />
        <Box ml={1} fontWeight={500} color="grey.900">
          {name}
        </Box>
      </Box>
      <Box color="grey.600" ml={1}>
        {semanticDate(created_at)}
      </Box>
    </Grid>
  );
}
