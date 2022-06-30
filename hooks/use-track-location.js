import { useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);

  const [locationErrMsg, setLocationErrMsg] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({ type: ACTION_TYPES.SET_LAT_LONG, payload: `${latitude},${longitude}` });
    setIsFindingLocation(false);
    setLocationErrMsg('');
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrMsg('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrMsg('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    locationErrMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
