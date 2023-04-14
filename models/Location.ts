export interface Location {
  latitude: Number;
  longitude: Number;
  altitude: Number;
  timestamp: Number; //Milliseconds since Unix epoch
  accuracy: Number;
  altitudeAccuracy: Number;
  speed: Number;
}