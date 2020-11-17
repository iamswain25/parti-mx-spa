import React from "react";
import { Post } from "../types";
import { Box, Grid, Divider, makeStyles, Hidden } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import { semanticDate } from "../helpers/datefns";
import SuggestionComment from "./SuggestionComment";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
import HtmlOrBody from "./HtmlOrBody";
import Linkify from "./Linkify";
import usePostLiked from "../store/usePostLiked";
import HashtagsDetail from "./HashtagsDetail";
const useStyles = makeStyles((theme) => {
  const colors = {
    emerald: theme.palette.primary.dark,
    grey900: theme.palette.grey[900],
  };
  return {
    root: {
      color: colors.grey900,
      paddingTop: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        flex: 1,
        maxWidth: 900,
        paddingLeft: 60,
        paddingRight: 60,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: theme.palette.background.paper,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.grey[300],
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        fontWeight: 500,
      },
    },
    image: {
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
    body: {
      whiteSpace: "pre-wrap",
      [theme.breakpoints.up("md")]: {
        fontSize: 16,
        letterSpacing: -0.4,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        letterSpacing: -0.3,
        marginTop: theme.spacing(1.5),
      },
    },
    small: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
    label: {
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
      },
      fontSize: 12,
      fontWeight: 500,
      color: colors.emerald,
      marginRight: theme.spacing(0.5),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: -2,
      margin: 0,
      fontFamily: "Roboto",
    },
  };
});
export default function SuggestionDetail({ post: p }: { post: Post }) {
  const { images = [], created_at, context, files = [], tags } = p;
  const [liked] = usePostLiked(p.id);
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <section className={classes.root}>
      <Box paddingX={2}>
        <Box className={classes.title}>
          <div>{p.title}</div>
          <Box display="flex" alignItems="center">
            <PostMenu post={p} />
          </Box>
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>전시일</Box>
              <Box>{semanticDate(created_at)}</Box>
            </Box>
          </Grid>
        </Box>
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
        <Box className={classes.body}>
          <Box className={classes.label}>전시사유</Box>
          <Linkify body={context} />
        </Box>
        <HashtagsDetail tags={p.tags} />
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          <Grid container justify="center" alignItems="center">
            {liked ? <BtnUnlikePost post={p} /> : <BtnLikePost post={p} />}
          </Grid>
        </Box>
      </Box>
      <Hidden mdUp implementation="css">
        <GreyDivider height={0.5} />
      </Hidden>
      <div>
        <SuggestionComment post={p} />
      </div>
    </section>
  );
}
