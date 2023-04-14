import { LatLng } from 'react-native-maps';

export interface Marker {
  id: String;
  coordinate: LatLng;
  title: String;
  description: String;
}
