// screens/Menu.js
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useId } from './utils/IdContext';

import { API_URL } from '@env';
import axios from 'axios';
const Menu = ({ navigation }) => {
    
    const handleBookedRides = () => {
        axios.get(`${API_URL}/${id}/bookedRides`)
        .then(response => {
          const rides = response.data;
          navigation.navigate('BookedRidesPage', { rides });
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };
      const handlePublishedRides = () => {
        axios.get(`${API_URL}/${id}/publishedRides`)
        .then(response => {
          const rides = response.data;
          navigation.navigate('ViewPublishedRidesPage', { rides });
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

const id =useId().id;
console.log('ID:', id);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.menuItem}>
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')} style={styles.menuItem}>
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddVehiclePage')} style={styles.menuItem}>
        <Text style={styles.menuText}>Add Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={(handleBookedRides)} style={styles.menuItem}>
        <Text style={styles.menuText}>Booked Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={(handlePublishedRides)} style={styles.menuItem}>
        <Text style={styles.menuText}>Published Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LandingPage')} style={styles.menuItem}>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071D21',
    justifyContent: 'center',
    padding: 20,
  },
  menuItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#E36607',
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Menu;
