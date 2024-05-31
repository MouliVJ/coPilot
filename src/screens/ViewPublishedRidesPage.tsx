import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import { Ride } from './utils/Ride'; // Replace '../path/to/Ride' with the actual path to the Ride type file
import { useId } from './utils/IdContext';
type RootStackParamList = {
  PickRidePage: { rides: Ride[] }; // Replace Ride[] with the actual type of your rides
};


const ViewPublishedRidesPage = ({ navigation }) => {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const route = useRoute();
  const id = useId().id;
  type RouteParams = {
    rides: Ride[];
  };

  const [rides, setRides] = useState((route.params as RouteParams)?.rides || []);

  const handleCancelRide = async () => {
    if (!selectedRide) return;

    try {
      const requestRide = rides.find((ride) => ride.publishedRideId === selectedRide);
  
      console.log('Requesting ride:',requestRide?.publishedRideId==selectedRide);
      if (requestRide) {
        const response = await axios.delete(`${API_URL}/${requestRide.publishedRideId}/cancelRide`);
        if (response.status === 200) {
          // Assuming the response contains the details of the requested ride
          Alert.alert(response.data);
          navigation.goBack();
        } else {
          // Handle error response
          console.error('Failed to request ride:', response.data);
        }
      } else {
        console.error('Failed to find ride:', selectedRide);
      }
    } catch (error) {
      console.error('Error cancelling ride:', error);
    }
  };

  const renderItem = ({ item }) => {
    const icon = item.type === 'car' ? require('./assets/car.png') : require('./assets/bike.png');
    const iconTintColor = item.publishedRideId === selectedRide ? 'white' : (item.gender === 'female' ? 'pink' : 'black');
    const backgroundColor = item.publishedRideId === selectedRide ? '#E36607' : 'white';
    const color = item.publishedId === selectedRide ? 'white' : 'black';

    return (
      <TouchableOpacity
        style={[styles.rideItem, { backgroundColor }]}
        onPress={() => setSelectedRide(item.publishedRideId)}
      >
        <Image source={icon} style={[styles.icon, { tintColor: iconTintColor }]} />
        <View>
          <Text style={[styles.rideFrom, { color }]}><Text style={[styles.bold]} >From</Text> - {item.from}  </Text>
          <Text style={[styles.rideFrom, { color }]}><Text style={[styles.bold]} >To</Text> - {item.to}</Text>
         
          <Text style={[styles.rideDate, { color }]}>{item.date}</Text>
          <Text style={[styles.rideTime, { color }]}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.title}>Published Rides</Text>
        <FlatList
          data={rides}
          renderItem={renderItem}
          keyExtractor={(item) => item.publishedId}
        />

        {selectedRide && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.requestButton} onPress={handleCancelRide}>
              <Text style={styles.requestButtonText}>Cancel Published Ride</Text>
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
  rideFrom: {
    fontSize: 18,
    color: '#555',
    paddingLeft: 10,
  },
  rideTo:{
    position: 'relative',
    fontSize: 14,
    color: '#555',
    marginLeft: 'auto',
  },
  bold : {
    fontWeight: 'bold',
  }
});

export default ViewPublishedRidesPage;
