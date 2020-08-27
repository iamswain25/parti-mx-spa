import React from "react";
import { Post, SuggestionMetadata } from "../types";
import {
  Box,
  Grid,
  Divider,
  makeStyles,
  Avatar,
  Hidden,
} from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import BtnUnlikePost from "./BtnUnlikePost";
import LinkPreview from "./LinkPreview";
import useDesktop from "./useDesktop";
import { semanticDate } from "../helpers/datefns";
import SuggestionComment from "./SuggestionComment";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useStore } from "../store/store";
import ShareButtons from "./ShareButtons";
import Linkify from "./Linkify";
import { Link } from "react-router-dom";
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
    tag: {
      margin: theme.spacing(0.5),
      color: theme.palette.primary.main,
      // borderColor: theme.palette.divider,
    },
  };
});
export default function SuggestionDetail({ post: p }: { post: Post }) {
  const [userStatus] = useGlobalState(keys.PERMISSION);
  const [{ user_id }] = useStore();
  const { body, images = [], createdBy, created_at, files = [], tags } = p;
  const liked = p.meLiked?.[0]?.like_count ?? 0;
  const metadata = p.metadata as SuggestionMetadata;
  const showFile = userStatus === "organizer" || createdBy.id === user_id;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box bgcolor="grey.100" pt={2} pb={4}>
      <Box paddingX={2} className={classes.root}>
        <Box className={classes.title}>
          <div>{p.title}</div>
          <Box display="flex" alignItems="center">
            <ShareButtons post={p} />
            <PostMenu post={p} />
          </Box>
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center">
            <Box className={classes.label}>Proposer</Box>
            <Avatar
              alt={createdBy?.name}
              src={createdBy?.photo_url}
              className={classes.small}
            />
            <Box ml={1} fontWeight={500}>
              {createdBy?.name}
            </Box>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>Date of Proposal</Box>
              <Box>{semanticDate(created_at)}</Box>
            </Box>
          </Grid>
        </Box>
        <FilesImages images={images} files={showFile ? files : undefined} />
        <Box className={classes.body}>
          <Box className={classes.label}>Description (Question & Image)</Box>
          <Linkify body={body} />
        </Box>
        <LinkPreview text={body} />
        {metadata?.address && (
          <Grid container alignItems="center" spacing={1}>
            <Grid item>Area:</Grid>
            <Grid item>
              <Link
                to={`/map/${p.board.id}/${p.id}`}
                style={{ textDecoration: "underline" }}
              >
                {metadata?.address}
              </Link>
            </Grid>
          </Grid>
        )}

        <Grid container>
          {tags?.map((chip) => {
            return (
              <span key={chip} className={classes.tag}>
                #{chip}
              </span>
            );
          })}
        </Grid>
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
