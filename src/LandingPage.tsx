import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Dimensions } from 'react-native';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    Alert.alert('Email entered: ' + email);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  input: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
    top: 540,
  },
  button: {
    backgroundColor: '#E36607',
    width: Dimensions.get('window').width - 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
    top: 640,
  },
  buttonText: {
    color: 'white',
  },
});

export default LandingPage;