// screens/Menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
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
      <TouchableOpacity onPress={() => navigation.navigate('BookedRides')} style={styles.menuItem}>
        <Text style={styles.menuText}>Booked Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PublishedRides')} style={styles.menuItem}>
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
