import React from "react";
import { Post, SuggestionMetadata } from "../types";
import { Box, Grid, Divider, makeStyles, Hidden } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import CommentContainer2 from "./CommentContainer2";
import FilesImages from "./FilesImages";
import PostMenu from "./PostMenu";
import HtmlOrBody from "./HtmlOrBody";
import Linkify from "./Linkify";
import usePostLiked from "../store/usePostLiked";
import HashtagsDetail from "./HashtagsDetail";
import ReactPlayer from "react-player";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
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
    more: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "&>button": {
        cursor: "pointer",
        border: "none",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        "&>svg": {
          width: 20,
          height: 20,
          color: theme.palette.common.white,
        },
      },
    },
  };
});
export default function SuggestionDetail({ post: p }: { post: Post }) {
  const { images = [], context, files = [] } = p;
  const metadata = p.metadata as SuggestionMetadata;
  const [liked] = usePostLiked(p.id);
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [more, setMore] = React.useState(false);
  function toggleMore() {
    setMore((m) => !m);
  }
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
        {ReactPlayer.canPlay(metadata?.youtube) && (
          <div className="player-wrapper">
            <ReactPlayer
              url={metadata?.youtube}
              width="100%"
              height="100%"
              className="react-player"
              controls={true}
            />
          </div>
        )}

        <Box className={classes.body}>
          <Box className={classes.label}>단체명·단체소개</Box>
          <Linkify body={context} />
        </Box>
        <HtmlOrBody post={p} />
        {metadata?.detail1 && (
          <Box className={classes.body}>
            <Box className={classes.label}>심사평</Box>
            <Linkify body={metadata?.detail1} />
          </Box>
        )}
        <div className={classes.more}>
          {more ? (
            <button onClick={toggleMore}>
              줄여서 보기
              <ExpandLessIcon />
            </button>
          ) : (
            <button onClick={toggleMore}>
              자세히 보기
              <ExpandMoreIcon />
            </button>
          )}
        </div>
        {more && (
          <>
            <div className={classes.body}>
              <Box className={classes.label}>일반현황</Box>
              <Linkify body={metadata?.detail2} />
            </div>
            <div className={classes.body}>
              <Box className={classes.label}>대표사례</Box>
              <Linkify body={metadata?.detail3} />
            </div>
            <div className={classes.body}>
              <FilesImages images={images} files={files} />
            </div>
          </>
        )}
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
        <CommentContainer2 post={p} />
      </div>
    </section>
  );
}
