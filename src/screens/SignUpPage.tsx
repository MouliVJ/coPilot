import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
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
      <Button title="Sign Up" onPress={handleSignUp} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  changeLink: {
    color: '#E36607', // Orange color
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
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
  },
});

export default SignUpPage;
