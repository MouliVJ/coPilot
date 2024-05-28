import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { API_URL,TOMTOM_API_KEY } from '@env';

const TakeRidePage = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');

  const handleSearch = async () => {
    try {
      const fromResponse = await axios.get(`https://api.tomtom.com/search/2/geocode/${fromQuery}.json?key=${TOMTOM_API_KEY}`);
      const toResponse = await axios.get(`https://api.tomtom.com/search/2/geocode/${toQuery}.json?key=${TOMTOM_API_KEY}`);

      const fromLoc = fromResponse.data.results[0].position;
      const toLoc = toResponse.data.results[0].position;

      setFromLocation(fromLoc);
      setToLocation(toLoc);

      // Send data to backend
      const data = {
        userId: 'user123', // Replace with actual user ID
        fromLocation: fromLoc,
        toLocation: toLoc,
      };

      await axios.post(`${API_URL}/api`, data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} customMapStyle={mapStyle}>
        {fromLocation && (
          <Marker coordinate={fromLocation} pinColor="green" />
        )}
        {toLocation && (
          <Marker coordinate={toLocation} pinColor="red" />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="From"
          value={fromQuery}
          onChangeText={setFromQuery}
        />
        <TextInput
          style={styles.input}
          placeholder="To"
          value={toQuery}
          onChangeText={setToQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }],
  },
  // Add more style elements as needed
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TakeRidePage;
