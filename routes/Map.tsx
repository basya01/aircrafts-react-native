import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import airplane from '../assets/airplane.png';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Corners, Status } from '../models';
import { fetchAircrafts } from '../store/slices/aircrafts';
import { regionToCornerPoints } from '../utils';
const { height, width } = Dimensions.get('window');

const Map = () => {
  const { status, states } = useAppSelector(
    (state) => state.aircrafts,
    (oldValue, newValue) => oldValue.states === newValue.states
  );
  const viewCorners = useRef<Corners | null>(null);
  const dispatch = useAppDispatch();
  const latitudeDelta = 0.28;
  const initialRegion: Region = {
    latitude: 50.005749372992376,
    longitude: 36.22918346541539,
    latitudeDelta,
    longitudeDelta: latitudeDelta * (width / height),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!viewCorners.current) {
        return;
      }
      dispatch(fetchAircrafts(viewCorners.current));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onRegionChangeComplete = (region: Region) => {
    const newCorners = regionToCornerPoints(region);
    dispatch(fetchAircrafts(newCorners));
    viewCorners.current = newCorners;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={initialRegion}
        style={styles.map}
      >
        {(status === Status.SUCCEEDED || status === Status.PENDING) &&
          states?.map((state) => {
            return (
              <Marker key={state[0]} coordinate={{ latitude: state[6], longitude: state[5] }}>
                <Image
                  source={airplane}
                  style={[
                    { height: 35, width: 35 },
                    {
                      transform: [{ rotateZ: `${state[10]}deg` }],
                    },
                  ]}
                />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Map;
