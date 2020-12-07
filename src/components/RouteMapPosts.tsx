import React from "react";
import { Board, ChipData, NoticeMetadata, Post } from "../types";
import { LinearProgress } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { makeStyles, Theme } from "@material-ui/core";
import MapPlace from "./MapPlace";
import usePosts from "../store/usePosts";
export const useStyles = makeStyles((theme: Theme) => ({
  map: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: `100%`,
    },
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
}));

export default function RouteMapPosts({
  board,
  chipData,
}: {
  board: Board;
  chipData?: ChipData[];
}) {
  const [posts] = usePosts<Post<NoticeMetadata>>({ board_id: board.id });
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = React.useState<
    Post<NoticeMetadata> | undefined
  >(undefined);
  React.useEffect(() => {
    if (posts && chipData) {
      const selectedTags = chipData
        .filter((c) => c.selected)
        .map((c) => c.label);
      const selectedPosts = posts.filter((p) =>
        selectedTags.every((t) => p.tags?.includes(t))
      );
      if (selectedPlace) {
        if (!selectedPosts.includes(selectedPlace)) {
          setSelectedPlace(undefined);
        }
      }
    }
  }, [posts, chipData, selectedPlace]);
  const defaultCenter = React.useMemo(() => {
    if (posts) {
      const accu = posts.reduce(
        (prev, curr) => {
          const lat = prev.lat + (curr?.metadata?.location?.latLng?.lat || 0);
          const lng = prev.lng + (curr?.metadata?.location?.latLng?.lng || 0);
          return { lat, lng };
        },
        { lat: 0, lng: 0 }
      );
      console.log(accu);
      return { lat: accu.lat / posts.length, lng: accu.lng / posts.length };
    }
    return undefined;
  }, [posts]);
  if (posts === undefined) {
    return <LinearProgress />;
  }
  function childClickHandler(key: number) {
    const post = posts?.[key];
    setSelectedPlace(post);
  }
  if (!defaultCenter) {
    return null;
  }
  return (
    <div className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBmxQGhxC-UzPzxIMlE9Sy09Dv9zUtiiW4",
        }}
        defaultCenter={defaultCenter}
        defaultZoom={10}
        onChildClick={childClickHandler}
      >
        {posts?.map((p, i) => {
          const { lat, lng } = p?.metadata?.location?.latLng || {};
          if (lat && lng) {
            return (
              <MapPlace
                lat={lat}
                lng={lng}
                key={i}
                selected={selectedPlace === p}
              />
            );
          }
          return null;
        })}
      </GoogleMapReact>
    </div>
  );
}
