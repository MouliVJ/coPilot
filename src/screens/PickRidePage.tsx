import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import { Ride } from './utils/Ride'; // Replace '../path/to/Ride' with the actual path to the Ride type file
import { useId } from './utils/IdContext';

type RootStackParamList = {
  PickRidePage: { rides: Ride[] }; // Replace Ride[] with the actual type of your rides
};


const PickRidePage = ({ navigation }) => {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const route = useRoute();
  const id = useId().id;
  type RouteParams = {
    rides: Ride[];
  };

  const [rides, setRides] = useState((route.params as RouteParams)?.rides || []);

  const handleRequestRide = async () => {
    if (!selectedRide) return;

    try {
      const request = 
      console.log('Requesting ride:', rides.find((ride) => ride.publishedRideId === selectedRide));
      const response = await axios.post(`${API_URL}/createRide`,{
        passengerId: id,
        rideDetails: rides.find((ride) => ride.publishedRideId === selectedRide),
      });

      if (response.status === 201) {
        // Assuming the response contains the details of the requested ride
        const requestedRide = response.data;
        console.log('Ride requested:', requestedRide);
        navigation.navigate('RideDetailsPage', { rideDetails : requestedRide });
      } else {
        // Handle error response
        console.error('Failed to request ride:', response.data);
      }
    } catch (error) {
      console.error('Error requesting ride:', error);
    }
  };

  const renderItem = ({ item }) => {
    const icon = item.type === 'car' ? require('./assets/car.png') : require('./assets/bike.png');
    const iconTintColor = item.publishedRideId === selectedRide ? 'white' : (item.gender === 'female' ? 'pink' : 'black');
    const backgroundColor = item.publishedRideId === selectedRide ? '#E36607' : 'white';
    const color = item.publishedRideId === selectedRide ? 'white' : 'black';

    return (
      <TouchableOpacity
        style={[styles.rideItem, { backgroundColor }]}
        onPress={() => setSelectedRide(item.publishedRideId)}
      >
        <Image source={icon} style={[styles.icon, { tintColor: iconTintColor }]} />
        <View>
          <Text style={[styles.rideName, { color }]}>{item.name}</Text>
          <Text style={[styles.rideDate, { color }]}>{item.date}</Text>
          <Text style={[styles.rideTime, { color }]}>{item.time}</Text>
        </View>
        <Text style={[styles.rideName, { color }]}></Text> 
        <Text style={[styles.rideFare, { color }]}>Rs {item.fare}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.title}>Pick a ride</Text>
        <FlatList
          data={rides}
          renderItem={renderItem}
          keyExtractor={(item) => item.publishedRideId}
        />

        {selectedRide && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
              <Text style={styles.requestButtonText}>Request Ride</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071D21',
  },
  list: {
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#071D21',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'Satoshi',
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  rideName: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontFamily: 'Satoshi',
  },
  rideTime: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 10,
  },
  rideFare: {
    fontSize: 18,
    color: '#555',
    marginLeft: 'auto',
    paddingTop: 70,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  footer: {
    padding: 10,
  },
  requestButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  requestButtonText: {
    color: '#E36607',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rideDate: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 10,
    paddingTop: 23,
  },
});

export default PickRidePage;
