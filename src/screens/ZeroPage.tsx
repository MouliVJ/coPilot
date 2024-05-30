import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { Alert } from 'react-native';

const ZeroPage = ({ navigation }) => {


  const [pageName, setPageName] = useState('');

  const navigateToPage = (page) => {
    navigation.navigate(page);
  };

  const handleDemoClick = () => {
    // You can add validation for the page name here if needed
    if (pageName.trim() !== '') {
      navigateToPage(pageName);
    } else {
      Alert.alert('Please enter a valid page name.');
    }
  };

  return (
    <View>
      <Button title="Test" onPress={() => navigateToPage('LandingPage')} />
      <Button title="Demo" onPress={() => handleDemoClick()} />
      <TextInput
        placeholder="Enter Page Name"
        onChangeText={(text) => setPageName(text)}
        value={pageName}
      />
    </View>
  );
};

export default ZeroPage;
