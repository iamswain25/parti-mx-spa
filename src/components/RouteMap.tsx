import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard, Board, Post } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import BoardTabNavigator from "./BoardTabNavigator";
import useDesktop from "./useDesktop";
import { useParams, NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import { Box, Grid, Typography, Hidden } from "@material-ui/core";
import HeaderBoard from "./HeaderBoard";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import PostSort from "./PostSort";
import GoogleMapReact from "google-map-react";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { makeStyles, Theme } from "@material-ui/core";
import RouteMapPost from "./RouteMapPost";
import MapPlace from "./MapPlace";
import RouteMapPostBottom from "./RouteMapPostBottom";
export const useStyles = makeStyles((theme: Theme) => ({
  smallIcon: {
    padding: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "inherit",
    color: theme.palette.grey[300],
    "&.active": {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
    "& svg": {
      width: 13,
      height: 13,
    },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[300],
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {},
  },
  container: {
    [theme.breakpoints.up("md")]: {
      maxWidth: 1200,
      paddingLeft: 30,
      paddingRight: 30,
      margin: "0 auto",
    },
  },
  titleContainer: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  mapContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 164px)",
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  map: {
    [theme.breakpoints.up("md")]: {
      position: "sticky",
      top: 48,
      width: "100%",
      height: "100vh",
    },
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
}));

export default function RoutePhoto() {
  const { board_id } = useParams();
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const [sort] = useGlobalState(keys.SORT);
  const { data, error, loading } = useQuery<PageBoard>(queryByBoardId, {
    variables: {
      board_id,
      user_id,
      isAnonymous: !user_id,
      sort: [postSortOptions[sort]],
    },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const [selectedPlace, setSelectedPlace] = React.useState<Post | undefined>(
    undefined
  );
  const [isDesktop] = useDesktop();
  const { group, group: { boards = [], title = "로딩 중" } = {}, ...b } =
    data?.mx_boards_by_pk || ({} as Board);
  function childClickHandler(key: number, childProps: any) {
    const post = b?.posts?.[key];
    setSelectedPlace(post);
  }
  return (
    <>
      <HeaderBoard title={title} />
      <BoardTabNavigator boards={boards} />
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant={isDesktop ? "h4" : "h5"} color="textPrimary">
              제안
            </Typography>
            <Box mr={1} />
            <Typography variant={isDesktop ? "h4" : "h5"} color="primary">
              {b?.posts_aggregate?.aggregate?.count}
            </Typography>
          </Box>
          <Box display="flex">
            <PostSort />
            <NavLink
              exact
              to={`/photo/${board_id}`}
              className={classes.smallIcon}
            >
              <GridOnIcon />
            </NavLink>
            <NavLink
              exact
              to={`/map/${board_id}`}
              className={classes.smallIcon}
            >
              <PinDropIcon />
            </NavLink>
          </Box>
        </Grid>
        <Box className={classes.mapContainer}>
          <Hidden smDown implementation="js">
            <Box width={267} mr={3} mt={3}>
              {b?.posts?.map((p, i) => (
                <RouteMapPost key={i} post={p} selectedPlace={selectedPlace} />
              ))}
            </Box>
          </Hidden>
          <Box className={classes.map}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBmxQGhxC-UzPzxIMlE9Sy09Dv9zUtiiW4",
              }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33,
              }}
              defaultZoom={11}
              onChildClick={childClickHandler}
            >
              {b?.posts?.map((p, i) => (
                <MapPlace
                  lat={59.955413 + Math.random() / 10}
                  lng={30.337844 + Math.random() / 10}
                  key={i}
                  selected={selectedPlace === p}
                />
              ))}
            </GoogleMapReact>
          </Box>
          <Hidden mdUp implementation="css">
            {selectedPlace && (
              <RouteMapPostBottom
                post={selectedPlace}
                setSelectedPlace={setSelectedPlace}
              />
            )}
          </Hidden>
        </Box>
      </section>
    </>
  );
}
