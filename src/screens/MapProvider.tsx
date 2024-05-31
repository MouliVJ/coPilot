import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {YOUR_GOOGLE_API_KEY,API_URL} from '@env';
import axios from 'axios';

const MapProvider = ({navigation}) => {
  const mapRef = useRef(null);
  const [selectedLocationFrom, setSelectedLocationFrom] = useState(null);
  const [selectedLocationTo, setSelectedLocationTo] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleMapPress = event => {
    const coordinate = event.nativeEvent.coordinate;
    if (!selectedLocationFrom) {
      setSelectedLocationFrom(coordinate);
    } else if (!selectedLocationTo) {
      setSelectedLocationTo(coordinate);
    }
  };

  useEffect(() => {
    if (selectedLocationFrom && selectedLocationTo) {
      fetchRoutes();
    }
  }, [selectedLocationFrom, selectedLocationTo]);

  const fetchRoutes = async () => {
    if (!selectedLocationFrom || !selectedLocationTo) return;

    const origin = `${selectedLocationFrom.latitude},${selectedLocationFrom.longitude}`;
    const destination = `${selectedLocationTo.latitude},${selectedLocationTo.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${YOUR_GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const routesData = data.routes.map(route => ({
        ...route,
        coordinates: route.legs[0].steps.map(step => ({
          latitude: step.start_location.lat,
          longitude: step.start_location.lng,
        })),
      }));
      setRoutes(routesData);
      if (routesData.length > 0) setSelectedRoute(routesData[0]);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const storeRoute = async () => {
    try {
      await axios.post(`${API_URL}/api/routes`, {
        userId: 'user123',
        source: selectedLocationFrom,
        destination: selectedLocationTo,
        waypoints: selectedRoute.coordinates,
        polyline: 'encoded_polyline_here', // Replace with the actual encoded polyline
      });
      Alert.alert('Route stored successfully!');
    } catch (error) {
      console.error('Error storing route:', error);
    }
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: 12.9365,
          longitude: 80.2376,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}>
        {selectedLocationFrom && <Marker coordinate={selectedLocationFrom} />}
        {selectedLocationTo && <Marker coordinate={selectedLocationTo} />}
        {selectedRoute && (
          <Polyline
            coordinates={selectedRoute.coordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Select From Location"
          onPress={(data, details = null) => {
            if (details) {
              setSelectedLocationFrom({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          query={{
            key: YOUR_GOOGLE_API_KEY,
            language: 'en',
          }}
          fetchDetails
        />
        <GooglePlacesAutocomplete
          placeholder="Select To Location"
          onPress={(data, details = null) => {
            if (details) {
              setSelectedLocationTo({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          query={{
            key: YOUR_GOOGLE_API_KEY,
            language: 'en',
          }}
          fetchDetails
        />
        <Button title="Store Route" onPress={storeRoute} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    width: '90%',
    zIndex: 1,
    alignSelf: 'center',
  },
});

export default MapProvider;
