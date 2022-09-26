import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';
import {HookResult} from '../models/hookResult';

interface LocationCoord {
  latitude: number;
  longitude: number;
}

export const useGeolocation = (): HookResult<LocationCoord> => {
  const [coords, setCoords] = useState<LocationCoord | null>();

  useEffect(() => {
    Geolocation.getCurrentPosition(position =>
      setCoords(_.pick(position.coords, 'latitude', 'longitude')),
    );
  }, []);

  return [coords, setCoords];
};
