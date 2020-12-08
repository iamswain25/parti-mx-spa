import React from "react";
import { Board, ChipData, NoticeMetadata, Post } from "../types";
import { LinearProgress } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import MapPlace from "./MapPlace";
import usePosts from "../store/usePosts";
import { DEFAULT_LAT_LNG } from "../helpers/options";

export default function RouteMapPosts({
  board,
  chipData,
}: {
  board: Board;
  chipData?: ChipData[];
}) {
  const [posts] = usePosts<Post<NoticeMetadata>>({ board_id: board.id });
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
          const latLng = curr?.metadata?.location?.latLng;
          if (latLng) {
            prev.lat = prev.lat + latLng?.lat;
            prev.lng = prev.lng + latLng?.lng;
            prev.length++;
          }
          return prev;
        },
        { lat: 0, lng: 0, length: 0 }
      );
      if (accu.length > 0) {
        return { lat: accu.lat / accu.length, lng: accu.lng / accu.length };
      } else {
        return DEFAULT_LAT_LNG;
      }
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
  if (defaultCenter === undefined) {
    return <LinearProgress />;
  }
  return (
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
  );
}