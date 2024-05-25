import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    color: 'pink',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default AboutPage;
