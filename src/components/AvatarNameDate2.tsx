import React from "react";
import { Box, makeStyles, Avatar, Grid } from "@material-ui/core";
import { semanticDate } from "../helpers/datefns";
import { PostLike } from "../types";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
  container: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
}));
export default function AvatarNameDate2({ postLike }: { postLike: PostLike }) {
  const classes = useStyles();
  const { name, photo_url, created_at } = postLike;
  const alteredName =
    name?.indexOf("@") > 0 ? name?.substr(0, name?.indexOf("@")) : name;
  return (
    <Grid item xs={6} sm={4} md={3} className={classes.container}>
      <Box display="flex" alignItems="center" mr={1}>
        <Avatar alt={alteredName} src={photo_url} className={classes.small} />
      </Box>
      <Box>
        <Box fontWeight={500} color="grey.900">
          {alteredName}
        </Box>
        <Box color="grey.600">{semanticDate(created_at)}</Box>
      </Box>
    </Grid>
  );
}
