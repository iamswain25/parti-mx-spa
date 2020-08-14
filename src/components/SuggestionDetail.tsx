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
import LinkPreview from "./LinkPreview";
import Linkify from "react-linkify";
import useDesktop from "./useDesktop";
import { semanticDate, closingDateFrom } from "../helpers/datefns";
import SuggestionComment from "./SuggestionComment";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
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
      [theme.breakpoints.up("md")]: {
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
function aTag(decoratedHref: string, decoratedText: string, key: number) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key}>
      {decoratedText}
    </a>
  );
}
export default function SuggestionDetail({ post: p }: { post: Post }) {
  const {
    body,
    images = [],
    createdBy,
    created_at,
    context,
    files = [],
    tags,
  } = p;
  const metadata = p.metadata as SuggestionMetadata;
  const liked = p.meLiked?.[0]?.like_count ?? 0;
  const closingAt = React.useMemo(() => {
    let after = undefined;
    const closingMethod = metadata?.closingMethod;
    if (!closingMethod) {
      return "계속";
    }
    try {
      after = Number(closingMethod?.replace("days", ""));
      return closingDateFrom(created_at, after);
    } catch (err) {
      console.log(metadata);
      return "버그";
    }
  }, [metadata, created_at]);

  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box bgcolor="grey.100" pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box className={classes.title}>
          {p.title}
          <Hidden smDown>
            <PostMenu post={p} />
          </Hidden>
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
            {/* <Box display="flex" alignItems="center">
              <Box className={classes.label}>제안동의 마감</Box>
              <Box>{closingAt}</Box>
            </Box> */}
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
        {/* <Box className={classes.body}>
          <Box className={classes.label}>제안배경</Box>
          <Linkify componentDecorator={aTag}>{context}</Linkify>
        </Box> */}
        <Box className={classes.body}>
          <Box className={classes.label}>Details</Box>
          <Linkify componentDecorator={aTag}>{body}</Linkify>
        </Box>
        <LinkPreview text={body} />
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
