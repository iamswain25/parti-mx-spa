import React from "react";
import { useStore } from "../store/store";
import { queryByBoardId } from "../graphql/query";
import { PageBoard, Post } from "../types";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import BoardTabNavigator from "./BoardTabNavigator";
import { useParams, NavLink } from "react-router-dom";
import GridOnIcon from "@material-ui/icons/GridOn";
import { Box, Grid, Typography, Hidden } from "@material-ui/core";
import { postSortOptions } from "../helpers/options";
import { useGlobalState, keys } from "../store/useGlobalState";
import PostSort from "./PostSort";
import GoogleMapReact from "google-map-react";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { makeStyles, Theme } from "@material-ui/core";
import RouteMapPost from "./RouteMapPost";
import MapPlace from "./MapPlace";
import RouteMapPostBottom from "./RouteMapPostBottom";
import usePermEffect from "./usePermEffect";
import Forbidden from "./Forbidden";
import { defaultHashtags } from "../helpers/options";
import { ChipData } from "../types";
import Chips from "./Chips";
export const useStyles = makeStyles((theme: Theme) => ({
  smallIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 104px)",
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "column",
      flex: 1,
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
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
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
  const [chipData, setChipData] = React.useState<ChipData[]>(
    defaultHashtags.map((c) => ({ label: c, selected: false }))
  );
  const [posts, setPosts] = React.useState<Post[] | undefined>(undefined);
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
  const board = data?.mx_boards_by_pk;
  React.useEffect(() => {
    if (board?.posts) {
      const selectedTags = chipData
        .filter((c) => c.selected)
        .map((c) => c.label);
      if (!selectedTags.length) {
        setPosts(board?.posts);
      } else {
        const selectedPosts = board?.posts.filter((p) =>
          selectedTags.every((t) => p.tags?.includes(t))
        );
        setPosts(selectedPosts);
        if (selectedPlace) {
          if (!selectedPosts.includes(selectedPlace)) {
            setSelectedPlace(undefined);
          }
        }
      }
    }
  }, [board, chipData, selectedPlace]);
  usePermEffect(board?.group?.users?.[0]?.status);
  if (loading) {
    return null;
  }
  if (!board) {
    return <Forbidden />;
  }
  const { group, ...b } = board;
  function childClickHandler(key: number, childProps: any) {
    const post = b?.posts?.[key];
    setSelectedPlace(post);
  }
  return (
    <>
      <BoardTabNavigator board={board} />
      <section className={classes.container}>
        <Chips chips={chipData} setChips={setChipData} />
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Box display="flex">
            <Typography variant="h4" color="textPrimary">
              {b.title}
            </Typography>
            <Box mr={1} />
            <Typography variant="h4" color="primary">
              {posts?.length ?? 0}
            </Typography>
          </Box>
          <Box display="flex">
            <PostSort />
            <NavLink
              exact
              className={classes.smallIcon}
              to={`/photo/${board_id}`}
            >
              <GridOnIcon />
            </NavLink>
            <NavLink
              exact
              className={classes.smallIcon}
              to={`/map/${board_id}`}
            >
              <PinDropIcon />
            </NavLink>
          </Box>
        </Grid>
        <div className={classes.mapContainer}>
          <Hidden smDown implementation="js">
            <Box width={267} mr={3} mt={3}>
              {posts?.map((p, i) => (
                <RouteMapPost key={i} post={p} selectedPlace={selectedPlace} />
              ))}
            </Box>
          </Hidden>
          <div className={classes.map}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBmxQGhxC-UzPzxIMlE9Sy09Dv9zUtiiW4",
              }}
              defaultCenter={{
                lat: 37.5696629,
                lng: 126.9134388,
              }}
              defaultZoom={11}
              onChildClick={childClickHandler}
            >
              {posts?.map((p, i) => {
                const {
                  coordinates: [lng, lat],
                } = p?.location || { coordinates: [null, null] };
                return (
                  <MapPlace
                    lat={lat}
                    lng={lng}
                    key={i}
                    selected={selectedPlace === p}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
          <Hidden mdUp implementation="css">
            {selectedPlace && (
              <RouteMapPostBottom
                post={selectedPlace}
                setSelectedPlace={setSelectedPlace}
              />
            )}
          </Hidden>
        </div>
      </section>
    </>
  );
}
