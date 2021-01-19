import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import MapPlace from "./MapPlace";
import { TextField, Box, FormControl } from "@material-ui/core";
import { LatLng, Location } from "../types";
import { DEFAULT_LAT_LNG } from "../helpers/options";

export default function GooglePlaceAutocomplete(props: {
  state: Location;
  setState: React.Dispatch<React.SetStateAction<Location>>;
}) {
  const { setState, state } = props;
  const { address = "", lat_lng } = state || {};
  function setAddress(address: string) {
    setState({ lat_lng, address });
  }
  function setLatLng(lat_lng: LatLng) {
    setState({ lat_lng, address });
  }
  async function handleSelect(address: string) {
    setAddress(address);
    return geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((lat_lng) => {
        setLatLng(lat_lng);
        console.log(lat_lng);
      })
      .catch((error) => console.error("Error", error));
  }
  return (
    <>
      <FormControl margin="normal" fullWidth>
        <PlacesAutocomplete
          value={address || ""}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <TextField
                variant="outlined"
                name="address"
                fullWidth
                label="주소를 입력하세요"
                helperText="예) 대한민국 서울특별시 서대문구 남가좌1동 서대문구사회적경제마을센터"
                inputProps={
                  getInputProps({
                    placeholder: "주소를 검색하세요 ...",
                    className: "location-search-input",
                  }) as any
                }
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={i}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </FormControl>
      <Box height={200}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyACd_eKd6RV29bhAu3N3pFwHOuMS-LJmjY",
          }}
          center={lat_lng}
          defaultCenter={DEFAULT_LAT_LNG}
          defaultZoom={11}
        >
          {lat_lng && <MapPlace {...lat_lng} selected={true} />}
        </GoogleMapReact>
      </Box>
    </>
  );
}
