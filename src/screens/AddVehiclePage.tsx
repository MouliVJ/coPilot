import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const AddVehiclePage = ({ navigation }) => {
  const [vehicleType, setVehicleType] = useState('bike');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const route = useRoute();
  const userId = (route.params as { userId?: string })?.userId ?? '';

  const handleAddVehicle = () => {
    
    // Validate input
    if (vehicleNumber.trim() === '') {
      // Alert user if any field is empty
      Alert.alert('Please fill in all fields.');
      return;
    }

    // Assuming there's some logic to save the vehicle data
    // For now, just log the data
    console.log('Vehicle Type:', vehicleType);
    console.log('Vehicle Number:', vehicleNumber);

    const requestBody = {
        userId: userId,
        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber,
        };
        console.log('Request:', requestBody);
        axios.post(`${API_URL}/users/addVehicle`, requestBody)
            .then(response => {
            console.log('Response:', response.data);
            })
            .catch(error => {
            console.error('Error:', error);
            });
    // Clear input fields after adding the vehicle
    setVehicleType('bike');
    setVehicleNumber('');
    Alert.alert('Vehicle added successfully');
    navigation.navigate('HomePage',{id:userId,publishRidePressed:false});
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, vehicleType === 'bike' ? styles.radioOptionSelected : null]}
          onPress={() => setVehicleType('bike')}
        >
          <Text style={[styles.radioText, vehicleType === 'bike' ? styles.radioTextSelected : null]}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[styles.radioOption, vehicleType === 'car' ? styles.radioOptionSelected : null]}
        onPress={() => setVehicleType('car')}
        >
        <Text style={[styles.radioText]}>Car</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddVehicle}>
        <Text style={styles.buttonText}>Add Vehicle</Text>
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
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioOption: {
    backgroundColor: '#071D21',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  radioOptionSelected: {
    backgroundColor: '#E36607',
  },
  radioText: {
    color: 'white',
    fontFamily: 'Satoshi',
    fontSize: 16,
  },
  radioTextSelected: {
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily: 'Satoshi',
  },
  button: {
    backgroundColor: '#E36607',
    borderRadius: 7,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
    fontSize: 20,
  },
});

export default AddVehiclePage;
