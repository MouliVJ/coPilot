import React, { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const SignUpPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState('');
  const route = useRoute();
  const email = (route.params as { email?: string })?.email ?? '';

  const handleSignUp = () => {
    // Clear previous error
    setError('');

    // Basic password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must contain both letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsChecked) {
      setError('You must accept the terms and conditions.');
      return;
    }
    axios.post(`http://10.0.2.2:8080/signup`, { email, password })
      .then(response => {    
        if (response.data === 'Success') {  
          navigation.navigate('ProfilePage', { email });
        }
      })
      .catch(error => {
        Alert.alert('Error: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Your current email is {email}</Text>

      <Text style={styles.changeLink} onPress={() => navigation.navigate('LandingPage')}>Change</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={termsChecked}
          onValueChange={setTermsChecked}
          tintColors={{ true: '#E36607', false: '#E36607' }}
        />
        <Text style={styles.checkboxLabel}>I accept the terms and conditions</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E36607', // Orange color
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    fontFamily: 'Satoshi',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071D21', // Dark background color
  },
  title: {
    fontSize: 25,
    fontFamily: 'Satoshi',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Satoshi',
    color: 'white',
    marginBottom: 20,
  },
  changeLink: {
    color: '#E36607', // Orange color
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Satoshi',
  },
  input: {
    backgroundColor: 'white',
    fontFamily: 'Satoshi',
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Satoshi',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontFamily: 'Satoshi',
  },
});

export default SignUpPage;
