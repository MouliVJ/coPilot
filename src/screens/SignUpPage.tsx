import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import LandingPage from './LandingPage';
import axios from 'axios';

const SignUpPage = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const route = useRoute();
  const email = (route.params as { email?: string })?.email ?? '';


  // ...

  const handleSignUp = () => {
    axios.post(`http://10.0.2.2:8080/signup`, { id , password})
      .then(response => {    
        if (response.data === 'Success') {  
          navigation.navigate('ProfilePage');
        }
      })
      .catch(error => {
        Alert.alert('Error: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Your current email is {(route.params as { email?: string })?.email ?? ''}</Text>

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
});

export default SignUpPage;
