
import React, { useState,useEffect } from 'react';
import { Alert,View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios'; 
import { useRoute } from '@react-navigation/native';

const LoginPage = ({navigation}) => {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState('');
  const route = useRoute();
  const email = (route.params as { email?: string })?.email ?? '';


  useEffect(() => {
    console.log('Email:', email);
    axios.get(`http://10.0.2.2:8080/users/id?email=${email}`)
      .then(response => {    
       console.log('ID: ' + response.data);
        setId(response.data);
      })
      .catch(error => {
        Alert.alert('Error fetching id: ' + error.message);
      });
  }, []);

  const handleLogin = () => {
    axios.post(`http://10.0.2.2:8080/login`, { id, password })
    .then(response => {
      navigation.navigate('HomePage', { id });
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        Alert.alert('Password incorrect');
      } else {
        Alert.alert('Error: ' + error.message);
      }
    });
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
