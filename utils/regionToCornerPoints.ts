import { Region } from 'react-native-maps';

export const regionToCornerPoints = (region: Region) => {
  const leftTop = {
    latitude: region.latitude + region.latitudeDelta / 2,
    longitude: region.longitude - region.longitudeDelta / 2,
  };
  const rightBottom = {
    latitude: region.latitude - region.latitudeDelta / 2,
    longitude: region.longitude + region.longitudeDelta / 2,
  };

  return { leftTop, rightBottom };
};
