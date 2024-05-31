import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { RideDetails } from './utils/RideDetails';
import { useRoute } from '@react-navigation/native';
import ProfilePage from './ProfilePage';
import { useId } from './utils/IdContext';

const RideDetailsPage = ({navigation}) => {
  const [riderInfo, setRiderInfo] = useState(null);
  const [passengerInfo, setPassengerInfo] = useState(null);
  const [selectedSection, setSelectedSection] = useState('passenger');
  const [passengerId, setPassengerId] = useState('');
  const [riderId, setRiderId] = useState('');
  const [uri,setUri] = useState('../Assets/image1.png');
  const route = useRoute();
  const id = useId().id;
type RouteParams = {
    rideDetails: RideDetails;
};

const rideDetails = (route.params as RouteParams)?.rideDetails || null;
const availableAvatars = [
  { id: "1", source: require('./assets/profile1.jpeg') },
  { id: "2", source: require('./assets/profile2.jpeg') },
  { id: "3", source: require('./assets/profile3.png') },
  { id: "4", source: require('./assets/profile4.jpeg') },
];

const fetchRiderInfo = async () => {
    if (!riderId) {
        console.log('Rider ID not set');
        return;
    }
    try {
        console.log('Rider ID:', riderId);
        const response = await axios.get(`${API_URL}/${riderId}/riderInfo`);
        console.log(response.data);
        setRiderInfo(response.data);
    } catch (error) {
        Alert.alert('Error fetching rider info: ' + (error as Error).message);
    }
};

const fetchPassengerInfo = async () => {
    if (!passengerId) {
        console.log('Rider ID not set');
        return;
    }
    console.log('Passenger ID:', passengerId);
    try {
        const response = await axios.get(`${API_URL}/${passengerId}/passengerInfo`);
        console.log(response.data);
        setPassengerInfo(response.data);
    } catch (error) {
        Alert.alert('Error fetching passenger info: ' + (error as Error).message);
    }
};
  useEffect(() => {
    if (rideDetails) {
      setPassengerId(rideDetails.passengerId);
      setRiderId(rideDetails.rideDetails.riderId);
    }
    if (selectedSection === 'rider') {
      fetchRiderInfo();
    } else {
      fetchPassengerInfo();
    }
  }, [selectedSection, rideDetails]);

const handleCancelRide = async () => {
    try {
        const response = await axios.delete(`${API_URL}/${rideDetails.id}/deleteRide`);
        Alert.alert('Ride Cancelled');
        navigation.navigate('HomePage');
    } catch (error) {
        Alert.alert('Error fetching rider info: ' + (error as Error).message);
    }
};

const handleStartOver = () => {
    navigation.navigate('HomePage');
};

  const renderInfo = (info, type) => {
    const avatar = availableAvatars.find((avatar) => avatar.id === info?.profileImage);
    if (!info) {
      return <Text style={styles.tabText}>No {type} Info</Text>;
    }


    return (
      <View style={styles.infoContainer}>
             <TouchableOpacity >
            {avatar && <Image source={avatar.source} style={styles.profileImage} />}
        </TouchableOpacity>

        <Text>{info.name}</Text>
        <Text>{info.contact}</Text>
        <Text>{info.email}</Text>
        <Text>{info.from}</Text>
        <Text>{info.to}</Text>
        {type === 'rider' && (
          <>
            <Text>{info.vehicleNumber}</Text>
            <Text>{info.vehicleType}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Ride Confirmed!!</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedSection === 'rider' && styles.tabButtonSelected]}
          onPress={() => setSelectedSection('rider')}
        >
          <Text style={styles.tabText}>Rider Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedSection === 'passenger' && styles.tabButtonSelected]}
          onPress={() => setSelectedSection('passenger')}
        >
          <Text style={styles.tabText}>Passenger Info</Text>
        </TouchableOpacity>
      </View>
      {selectedSection === 'rider' ? renderInfo(riderInfo, 'rider') : renderInfo(passengerInfo, 'passenger')}
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRide}>
        <Text style={styles.cancelButtonText}>Cancel Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleStartOver}>
        <Text style={styles.cancelButtonText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071D21',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#071D21',
  },
  tabButtonSelected: {
    borderBottomColor: '#E36607',
  },
  tabText: {
    color: 'white',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#E36607',
    borderRadius: 7,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 70,
    fontFamily: 'Satoshi',
  },
});

export default RideDetailsPage;
