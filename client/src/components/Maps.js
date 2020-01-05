import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React from "react";

const mapStyles = {
  width: "100%",
  height: "100%",
  margin: "12px 5px"
};

const Maps = props => {
  const { lat, lng } = props;
  return (
    <div
      id="mapContainer"
      style={{
        position: "relative",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        padding: 0
      }}
    >
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </Map>
    </div>
  );
};

const MAPS_API_KEY = process.env.MAPS_API_KEY;

export default GoogleApiWrapper({
  apiKey: MAPS_API_KEY
})(Maps);
