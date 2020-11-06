import React from "react";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import useDesktop from "./useDesktop";
import { Link } from "react-router-dom";
import HomeBoardPhoto from "./HomeBoardPhoto";
import { LazyImage } from "react-lazy-images";
import YoutubePreview from "./YoutubePreview";
import BoardMoreTag from "./BoardMoreTag";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    titleContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {},
    },
    desc: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: "22px",
      letterSpacing: -0.39,
    },
    photoGrid: {
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
      },
    },
    announcement: {
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    img: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
    imgContainer: {
      width: "53%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "auto",
      },
    },
    textContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      justifyContent: "center",
      wordBreak: "keep-all",
    },
    announceTitle: {
      marginBottom: theme.spacing(2),
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: "24px",
      letterSpacing: -0.44,
    },
  };
});

export default function HomeBoardNotice({ board: b }: { board?: Board }) {
  const [isDesktop] = useDesktop();
  const classes = useStyles();

  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant="h2" color="textPrimary">
            <Link to={`/home/${b?.id}`}>
              <Box fontWeight="bold">{b?.title}</Box>
              <div className={classes.desc}>{b?.body}</div>
            </Link>
          </Typography>
        </Grid>
        <div>
          {b?.announcement?.map((p, i) => (
            <Link
              to={`/post/${p.id}`}
              className={classes.announcement}
              key={p.id}
            >
              <div className={classes.textContainer}>
                <div className={classes.announceTitle}>{p.title}</div>
                <div>{p.body}</div>
              </div>
              <div className={classes.imgContainer}>
                {p?.images?.[0]?.uri ? (
                  <LazyImage
                    alt={p.title}
                    placeholder={({ imageProps, ref }) => (
                      <div ref={ref} className={classes.img} />
                    )}
                    src={p?.images?.[0]?.uri}
                    actual={({ imageProps }) => (
                      <img
                        {...imageProps}
                        alt={imageProps.alt}
                        className={classes.img}
                      />
                    )}
                  />
                ) : (
                  <YoutubePreview text={p.body} />
                )}
              </div>
            </Link>
          ))}
        </div>
        <Grid container spacing={3} className={classes.photoGrid}>
          {b?.posts.map((p) => (
            <HomeBoardPhoto key={p.id} p={p} />
          ))}
        </Grid>
        <BoardMoreTag to={`/home/${b?.id}`} />
      </section>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
