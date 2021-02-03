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
import useDesktop from "./useDesktop";
import CommentContainer2 from "./CommentContainer2";
import { semanticDate, closingDateFrom } from "../helpers/datefns";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
import HtmlOrBody from "./HtmlOrBody";
import Linkify from "./Linkify";
import usePostLiked from "../store/usePostLiked";
import useUser from "../store/useUser";
import LinkPreview from "./LinkPreview";
const useStyles = makeStyles(theme => {
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
  const { images = [], created_by, created_at, context, files = [], tags } = p;
  const metadata = p.metadata as SuggestionMetadata;
  const [liked] = usePostLiked(p.id);
  const [user] = useUser({ id: created_by });
  const closingAt = React.useMemo(() => {
    let after = undefined;
    const closingMethod = metadata?.closingMethod;
    if (!closingMethod) {
      return "계속";
    }
    if (closingMethod === "manual") {
      return "토론 정리 시 종료";
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
    <Box pt={2}>
      <Box paddingX={2} className={classes.root}>
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
          <Grid container justify="space-between">
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>제안자</Box>
              <Avatar
                alt={user?.name}
                src={user?.photo_url}
                className={classes.small}
              />
              <Box ml={1} fontWeight={500}>
                {user?.name}
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box className={classes.label}> 조회</Box>
              <Box>{p.count_view}</Box>
            </Box>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>제안일</Box>
              <Box>{semanticDate(created_at)}</Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box className={classes.label}>제안동의 마감</Box>
              <Box>{closingAt}</Box>
            </Box>
          </Grid>
        </Box>
        <FilesImages images={images} files={files} />
        <Box className={classes.body}>
          <Box className={classes.label}>제안배경</Box>
          <Linkify body={context} />
        </Box>
        <LinkPreview text={context} />
        <HtmlOrBody post={p} />
        <Grid container>
          {tags?.map(chip => {
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
        <CommentContainer2 post={p} likeLabel="동의 인원" />
      </div>
    </Box>
  );
}
