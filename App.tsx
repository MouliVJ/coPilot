import React, { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { TouchableOpacity, Image, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'; // Import Image from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { IdProvider } from './src/screens/utils/IdContext';
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
import Menu from './src/screens/Menu';
import BookedRidesPage from './src/screens/BookedRidesPage';
import ViewPublishedRidesPage from './src/screens/ViewPublishedRidesPage';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <IdProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'LandingPage' && route.name !== 'HomePage', // Hide header on LandingPage
          headerTransparent: true,
          headerTitle: '',
          headerStyle: { backgroundColor: 'transparent' },
          headerBackTitleVisible: false,
          headerRight: () => {
            if (route.name !== 'Menu' && route.name !== 'LoginPage' && route.name !== 'SignupPage' ) {
              return <MenuButton />;
              
            } else {
              return null; // Don't render anything for Menu screen
            }
          },
          headerLeft: () => {
            if (route.name !== 'HomePage') {
              return <BackButton />;
              
            } else {
              return null; // Don't render anything for Menu screen
            }
          },
          }
        
      )}
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
        <Stack.Screen name="BookedRidesPage" component={BookedRidesPage} />
        <Stack.Screen name="ViewPublishedRidesPage" component={ViewPublishedRidesPage} />
        <Stack.Screen name="Menu" component={Menu} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
    </IdProvider>
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
      { <TouchableOpacity  onPress={() => navigation.navigate('Menu',{id})}>
        <Image source={require('./src/Assets/menu.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
      </TouchableOpacity> }
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
