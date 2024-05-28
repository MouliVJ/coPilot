import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import LandingPage from './src/screens/LandingPage';
import SignupPage from './src/screens/SignUpPage';
import ProfilePage from './src/screens/ProfilePage';
import LoginPage from './src/screens/LoginPage';
import HomePage from './src/screens/HomePage';
import TakeRidePage from './src/screens/TakeRidePage';
import ZeroPage from './src/screens/ZeroPage';
// Add this import statement

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="zero" component={ZeroPage} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="TakeRidePage" component={TakeRidePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
