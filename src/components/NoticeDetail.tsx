import React from "react";
import { Post } from "../types";
import { Box, Grid, Divider, makeStyles, Hidden } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import AvatarNameDate from "./AvatarNameDate";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import NoticeComment from "./NoticeComment";
import HtmlOrBody from "./HtmlOrBody";
const useStyles = makeStyles((theme) => {
  return {
    root: {
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 60,
        fontSize: 24,
        letterSpacing: -0.6,
        paddingBottom: theme.spacing(2),
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
  };
});

export default function NoticeDetail({ post: p }: { post: Post }) {
  const { images, createdBy, created_at, files } = p;
  const liked = p.meLiked?.[0]?.like_count ?? 0;
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <Box bgcolor="grey.100" pt={2}>
      <Box paddingX={2} className={classes.root}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Hidden smDown>
            <PostMenu post={p} />
          </Hidden>
        </Box>
        <Box mt={1}>
          <AvatarNameDate
            name={createdBy?.name}
            photo_url={createdBy?.photo_url}
            created_at={created_at}
          />
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>
        <FilesImages images={images} files={files} />
        <HtmlOrBody post={p} />
        <Box mt={4} mb={isDesktop ? 5 : 2}>
          <Grid container justify="center" alignItems="center">
            {liked ? <BtnUnlikePost post={p} /> : <BtnLikePost post={p} />}
          </Grid>
        </Box>
      </Box>
      {!isDesktop && <GreyDivider height={0.5} />}
      <div className={classes.root}>
        <NoticeComment post={p} />
      </div>
    </Box>
  );
}
