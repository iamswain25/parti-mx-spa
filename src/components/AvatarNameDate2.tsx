import React from "react";
import { Box, makeStyles, Avatar, Grid } from "@material-ui/core";
import { semanticDate } from "../helpers/datefns";
import { UserPost } from "../types";
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
export default function AvatarNameDate2({ userPost }: { userPost: UserPost }) {
  const classes = useStyles();
  const {
    user: { name = "로딩중", photo_url = "로딩중" },
    created_at = "로딩중",
  } = userPost;
  return (
    <Grid className={classes.container}>
      <Box display="flex" alignItems="center" mr={1}>
        <Avatar alt={name} src={photo_url} className={classes.small} />
      </Box>
      <Box>
        <Box fontWeight={500} color="grey.900">
          {name}
        </Box>
        <Box color="grey.600">{semanticDate(created_at)}</Box>
      </Box>
    </Grid>
  );
}