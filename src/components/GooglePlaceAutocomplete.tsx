import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import MapPlace from "./MapPlace";
import { TextField, Box, FormControl } from "@material-ui/core";
import { LatLng } from "../types";
export default function GooglePlaceAutocomplete(props: {
  address?: string;
  setAddress: (arg: string) => void;
  latLng?: LatLng;
  setLatLng: (arg: LatLng) => void;
}) {
  const { address, setAddress, setLatLng, latLng } = props;
  async function handleSelect(address: string) {
    setAddress(address);
    return geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLatLng(latLng);
        console.log(latLng);
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
                label="Area"
                helperText="Example) 119, Sejong-daero, Jung-gu, Seoul, Korea, 04519 "
                {...getInputProps({
                  placeholder: "search your address",
                  className: "location-search-input",
                })}
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
          center={latLng}
          defaultCenter={{
            lat: 37.5696629,
            lng: 126.9134388,
          }}
          defaultZoom={11}
          // onChildClick={childClickHandler}
        >
          {latLng && <MapPlace {...latLng} selected={true} />}
        </GoogleMapReact>
      </Box>
    </>
  );
}
