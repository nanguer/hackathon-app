import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';

export function PlacesWrapper(props) {
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  if (props.defaultLocation) {
    React.useEffect(() => {
      setAddress(props.defaultLocation);
    }, [props.defaultLocation]);
  }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    props.location(address);
    props.latLng(latLng);
  };

  return (
    <span>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="placesInput"
              {...getInputProps({
                placeholder: 'Start typing...'
              })}
            />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#3366CC' : '#ffff'
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </span>
  );
}
const MAPS_API_KEY = process.env.MAPS_API_KEY;

export default GoogleApiWrapper({
  apiKey: MAPS_API_KEY
})(PlacesWrapper);
