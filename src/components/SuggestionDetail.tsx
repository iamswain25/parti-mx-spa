import React from "react";
import { Post, SuggestionMetadata } from "../types";
import {
  Box,
  Grid,
  Divider,
  makeStyles,
  Avatar,
  Hidden,
  Paper,
  Chip,
} from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import { semanticDate, closingDateFrom } from "../helpers/datefns";
import SuggestionComment from "./SuggestionComment";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
import ShareButtons from "./ShareButtons";
import HtmlOrBody from "./HtmlOrBody";
import Linkify from "./Linkify";
import usePostLiked from "../store/usePostLiked";
import useComments from "../store/useComments";
const useStyles = makeStyles((theme) => {
  const colors = {
    emerald: theme.palette.primary.dark,
    grey900: theme.palette.grey[900],
  };
  return {
    root: {
      color: colors.grey900,
      [theme.breakpoints.up("md")]: {
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
    chip: {
      margin: theme.spacing(0.5),
      color: theme.palette.text.primary,
      borderColor: theme.palette.divider,
    },
  };
});
export default function SuggestionDetail({ post: p }: { post: Post }) {
  const { images = [], created_by, created_at, context, files = [], tags } = p;
  const [liked] = usePostLiked(p.id);
  const metadata = p.metadata as SuggestionMetadata;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box className={classes.title}>
          <div>{p.title}</div>
          <Hidden smDown implementation="css">
            <Box display="flex" alignItems="center">
              <ShareButtons post={p} />
              <PostMenu post={p} />
            </Box>
          </Hidden>
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center">
            <Box className={classes.label}>제보자</Box>
            <Box ml={1} fontWeight={500}>
              {p?.name}
            </Box>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>제보일</Box>
              <Box>{semanticDate(created_at)}</Box>
            </Box>
          </Grid>
        </Box>
        {tags && (
          <Paper component="ul" className={classes.chips} elevation={0}>
            {tags.map((chip) => {
              return (
                <li key={chip}>
                  <Chip
                    variant="outlined"
                    label={chip}
                    className={classes.chip}
                  />
                </li>
              );
            })}
          </Paper>
        )}
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
        <Box className={classes.body}>
          <Box className={classes.label}>제보사유</Box>
          <Linkify body={context} />
        </Box>
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          <Grid container justify="center" alignItems="center">
            {liked ? <BtnUnlikePost post={p} /> : <BtnLikePost post={p} />}
          </Grid>
        </Box>
      </Box>
      <Hidden mdUp implementation="css">
        <GreyDivider height={0.5} />
      </Hidden>
      <div className={classes.root}>
        <SuggestionComment post={p} />
      </div>
    </Box>
  );
}
