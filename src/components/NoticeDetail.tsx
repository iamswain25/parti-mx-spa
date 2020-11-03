import React from "react";
import { Post } from "../types";
import { Box, Grid, Divider, makeStyles } from "@material-ui/core";
import BtnLikePost from "./BtnLikePost";
import GreyDivider from "./GreyDivider";
import AvatarNameDate from "./AvatarNameDate";
import BtnUnlikePost from "./BtnUnlikePost";
import useDesktop from "./useDesktop";
import PostMenu from "./PostMenu";
import FilesImages from "./FilesImages";
import NoticeComment from "./NoticeComment";
import HtmlOrBody from "./HtmlOrBody";
import usePostLiked from "../store/usePostLiked";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(2),
      flex: 1,
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
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        paddingBottom: theme.spacing(1),
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
  const { images, created_at, files, name } = p;
  const [liked] = usePostLiked(p.id);
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <section className={classes.root}>
      <Box paddingX={2}>
        <Box color="grey.900" className={classes.title}>
          {p.title}
          <Box display="flex" alignItems="center">
            {/* <PostMenu post={p} /> */}
          </Box>
        </Box>
        <Box mt={1}>
          <AvatarNameDate name={name} created_at={created_at} />
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
      <div>
        <NoticeComment post={p} />
      </div>
    </section>
  );
}
