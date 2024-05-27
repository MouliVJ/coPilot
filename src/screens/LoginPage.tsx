import React, { useState, } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginPage = () => {
  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.forgotPassword} onPress={() => console.log("Forgot Password clicked")}>
        Forgot Password?
      </Text>

      <Button title="Login" onPress={handleLogin} />

      {/* Add other components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071D21', // Dark background color
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#E36607', // Orange color
    marginBottom: 20,
    textAlign: 'right',
    width: '100%',
  },
});

export default LoginPage;
