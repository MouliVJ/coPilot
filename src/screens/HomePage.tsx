import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '@env';

const HomePage = ({ navigation }) => {
  // const [takeRidePressed, setTakeRidePressed] = useState(false);
  // const [publishRidePressed, setPublishRidePressed] = useState(false);
  
  
      
  
  const [userName, setUserName] = useState('User');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const id = (route.params as { id?: string })?.id ?? '';

  console.log(`${API_URL}/users/${id}/firstname`);
  useEffect(() => {
    axios
      .get(`${API_URL}/users/${id}/firstname`)
      .then(response => {
        setUserName(response.data);
      })
      .catch(error => {
        console.error('Error fetching user name:', error);
      });
  }, [id]);

  const handleTakeRidePress = () => {
    navigation.navigate('TakeRidePage', { id });
    // setTakeRidePressed(!takeRidePressed);
  };

  const handlePublishRidePress = () => {
    setModalVisible(true);
    // setPublishRidePressed(!publishRidePressed);
    axios
      .get(`${API_URL}/users/${id}/vehicle`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setVehicles(response.data);
        } else {
          setVehicles([]);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
      });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // setPublishRidePressed(false);
  };

  const handleSelectVehicle = () => {
    setModalVisible(false);
    console.log('Vehicle Id:', selectedVehicleId);
    navigation.navigate('PublishRidePage', { id, selectedVehicleId });
  };

  const handleAddVehiclePress = () => {
    navigation.navigate('AddVehiclePage', { userId: id });
    // setPublishRidePressed(publishRidePressed);
  };

  return (
    <View style={styles.container}>
    <View style={styles.buttonContainer1}>
    { <TouchableOpacity  onPress={() => navigation.navigate('Menu')}>
      <Image source={require('./assets/menu.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
    </TouchableOpacity> }
    </View>
      <Text style={styles.welcomeText}>Hello {userName}! Buckle up</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleTakeRidePress}
        >
          <Text style={styles.buttonText}>🚀 Take a Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handlePublishRidePress}
        >
          <Text style={styles.buttonText}>🚀 Publish a Ride</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
            {vehicles.length === 0 && (
              <Text style={styles.vehicleNotFoundText}>Vehicle not found</Text>
            )}
            <Text style={styles.addVehicleLink} onPress={handleAddVehiclePress}>
              Add Vehicle
            </Text>
            {vehicles.length > 0 && (
              <>
                <View style={styles.vehicleList}>
                  {vehicles.map(vehicle => (
                    <Pressable
                      key={vehicle.vehicleId}
                      style={styles.vehicleItem}
                      onPress={() => setSelectedVehicleId(vehicle.vehicleId)}
                    >
                      
                      <View style={styles.radioButton}>
                        {selectedVehicleId === vehicle.vehicleId && (
                          <View style={styles.radioButtonSelected} />
                        )}
                      </View>
                      <Text style={styles.vehicleText}>
                        {vehicle.vehicleType} - {vehicle.vehicleNumber}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSelectVehicle}>
                  <Text style={styles.buttonText}>Select Vehicle</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
  },
  addVehicleLink: {
    color: '#007BFF', // Blue color for hyperlink
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  vehicleNotFoundText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  vehicleList: {
    width: '100%',
    marginTop: 10,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E36607',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#E36607',
  },
  vehicleText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer1: {
    position: 'absolute',
    right:25,
    top: 15,
  },
});

export default HomePage;
