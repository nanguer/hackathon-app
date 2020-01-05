import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import React from 'react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const Maps = props => {
  const { lat, lng } = props;
  return (
    <div style={{ height: '30vh', width: '45vw', position: 'relative' }}>
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
