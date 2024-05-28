import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const [takeRidePressed, setTakeRidePressed] = useState(false);
  const [publishRidePressed, setPublishRidePressed] = useState(false);
  const [userName, setUserName] = useState('User');
  const route = useRoute();
  const id = (route.params as { id?: string })?.id ?? '';

  useEffect(() => {
    axios.get('http://localhost:8080/users/{id}/firstName')
      .then(response => {
        setUserName(response.data.name);
      });
  }, []);

  const handleTakeRidePress = () => {
    setTakeRidePressed(!takeRidePressed);
  };

  const handlePublishRidePress = () => {
    setPublishRidePressed(!publishRidePressed);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello {userName}! Buckle up</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            takeRidePressed && styles.buttonPressed
          ]}
          onPress={handleTakeRidePress}
        >
          <Text style={styles.buttonText}>🚀 Take a Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            publishRidePressed && styles.buttonPressed
          ]}
          onPress={handlePublishRidePress}
        >
          <Text style={styles.buttonText}>🚀 Publish a Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071D21', // Dark background color
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  buttonsContainer: {
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E36607', // Orange color
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonPressed: {
    backgroundColor: '#D35400', // Darker orange color when pressed
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomePage;