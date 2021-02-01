import React from "react";
import { Board, SuggestionMetadata, Post } from "../types";
import { LinearProgress } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import MapPost from "./MapPost";
import usePosts from "../store/usePosts";
import { DEFAULT_LAT_LNG } from "../helpers/options";
export default function RouteMapPosts({ board }: { board: Board }) {
  const [posts] = usePosts({ board_id: board.id });
  const [selectedPlace, setSelectedPlace] = React.useState<
    Post<SuggestionMetadata> | undefined
  >(undefined);
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
        { lat: 0, lng: 0, length: 0 },
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
  function childClickHandler(key: string) {
    const post = posts?.find(p => p?.id === key);
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
      onClick={e => {
        const container = e.event.target.closest(".info-window");
        if (container) {
          childClickHandler(container.id);
        } else {
          setSelectedPlace(undefined);
        }
      }}
    >
      {posts?.map((p, i) => {
        const { lat, lng } = p?.metadata?.location?.latLng || {};
        if (lat && lng) {
          return (
            <MapPost
              lat={lat}
              lng={lng}
              key={p.id}
              post={p}
              selected={selectedPlace?.id === p?.id}
            />
          );
        }
        return null;
      })}
    </GoogleMapReact>
  );
}
