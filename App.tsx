import React, { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { TouchableOpacity, Image, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'; // Import Image from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import LandingPage from './src/screens/LandingPage';
import SignupPage from './src/screens/SignUpPage';
import ProfilePage from './src/screens/ProfilePage';
import LoginPage from './src/screens/LoginPage';
import HomePage from './src/screens/HomePage';
import TakeRidePage from './src/screens/TakeRidePage';
import PublishRidePage from './src/screens/PublishRidePage';
import AddVehiclePage from './src/screens/AddVehiclePage';
import ZeroPage from './src/screens/ZeroPage';
import RideDetailsPage from './src/screens/RideDetailsPage';
import PickRidePage from './src/screens/PickRidePage';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'LandingPage', // Hide header on LandingPage
          headerTransparent: true,
          headerTitle: '',
          headerStyle: { backgroundColor: 'transparent' },
          headerBackTitleVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => <MenuButton />,
          
        })}
      >
        {/* <Stack.Screen name="TestPage" component={TestPage} /> */}
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="TakeRidePage" component={TakeRidePage} />
        <Stack.Screen name="PublishRidePage" component={PublishRidePage} />
        <Stack.Screen name="AddVehiclePage" component={AddVehiclePage} />
        <Stack.Screen name="PickRidePage" component={PickRidePage} />
        <Stack.Screen name="RideDetailsPage" component={RideDetailsPage} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
      <Image source={require('./src/Assets/back.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
    </TouchableOpacity>
    </View>
  );
};
const MenuButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonContainer1}>
      {/* <TouchableOpacity>
        <Image source={require('./src/Assets/menu.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
      </TouchableOpacity> */}
       <Text onPress={() => navigation.navigate('LandingPage')} style={styles.logout}>Logout</Text>
     </View>
    
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    color: 'white', 
    // left: 10,
    // top: 15,
  },
  buttonContainer1: {
    position: 'absolute',
     right: 8,
    // top: 10,
  },
  logout:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
 
});

export default App;
