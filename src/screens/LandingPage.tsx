import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-elements';
import Config from 'react-native-config';
import { API_URL } from '@env';



const LandingPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  
  const handleContinue = () => {
    if (!email.endsWith('@comcast.com')) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    
    axios.post(`${API_URL}/validateEmail`, { email })
      .then(response => {
        if (response.data === 'Sign Up') {
          navigation.navigate('SignupPage', { email });
        } else if (response.data === 'Sign In'){
          navigation.navigate('LoginPage', { email });
        }
        else{
          Alert.alert('Error: ' + response.data);
        }
      })
      .catch(error => {
        Alert.alert('Error: ' + error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../Assets/image5.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.findYourNextText}>Find your next</Text>
      <Text style={styles.sharedRideText}>Shared Ride</Text>
      <Text style={styles.welcomeText}>Welcome, Let’s get started</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#071D21',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  findYourNextText: {
    fontFamily: "Satoshi",
    fontSize: 23,
    fontWeight: "400",
    color: 'rgba(255, 255, 255, 0.6)', // 60% opacity white
    textAlign: "center",
    marginBottom: 5,
  },
  sharedRideText: {
    color: '#99ffdd',
    fontWeight: '500', // Medium
    fontSize: 30,
    fontFamily: "Satoshi",
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: "Satoshi",
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 7,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E36607',
    borderRadius: 7,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "Satoshi",
    fontSize: 20,
  },
});

export default LandingPage;
