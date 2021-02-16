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
  const { address = "", latLng } = state || {};
  function setAddress(address: string) {
    setState({ latLng, address });
  }
  function setLatLng(latLng: LatLng) {
    setState({ latLng, address });
  }
  async function handleSelect(address: string) {
    setAddress(address);
    return geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLatLng(latLng);
        console.log(latLng);
      })
      .catch(error => console.error("Error", error));
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
                helperText="주소 입력 시 게시판 지도에 위치정보가 표시됩니다."
                inputProps={
                  getInputProps({
                    placeholder:
                      "예) 서울시특별시 서대문구 남가좌1동 서대문사회적경제마을센터",
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
          center={latLng}
          defaultCenter={DEFAULT_LAT_LNG}
          defaultZoom={11}
        >
          {latLng && <MapPlace {...latLng} selected={true} />}
        </GoogleMapReact>
      </Box>
    </>
  );
}
