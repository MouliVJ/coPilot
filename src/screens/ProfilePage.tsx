import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ProfilePage = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(require('../Assets/image1.png')); // Default image
  const [profileImage, setProfileImage] = useState("1"); // Default image identifier
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const route = useRoute();
  const id = (route.params as { id?: string })?.id ?? '';

  const availableAvatars = [
    { id: "1", source: require('../Assets/image1.png') },
    { id: "2", source: require('../Assets/image2.png') },
    { id: "3", source: require('../Assets/image3.png') },
    { id: "4", source: require('../Assets/image4.png') },
  ];

  const handleImagePress = (image) => {
    setSelectedImage(image.source);
    setProfileImage(image.id);
    setIsModalVisible(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSetProfile = () => {
    const profileData = {
      id,
      profileImage,
      firstName,
      secondName: lastName,
      phoneNumber,
      gender
    };

    axios.post('http://10.0.2.2:8080/setProfile', {
      id,
      profileImage,
      firstName,
      secondName: lastName,
      phoneNumber,
      gender
    })
      .then(response => {
        console.log('Profile set!', response.data);
        navigation.navigate('HomePage');
      })
      .catch(error => {
        console.error('There was an error setting the profile!', error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Image source={selectedImage} style={styles.avatar} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {availableAvatars.map((avatar) => (
              <TouchableOpacity key={avatar.id} onPress={() => handleImagePress(avatar)}>
                <Image source={avatar.source} style={styles.modalAvatar} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.genderButtonSelected]}
          onPress={() => handleGenderSelect('male')}
        >
          <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.genderButtonSelected]}
          onPress={() => handleGenderSelect('female')}
        >
          <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>Female</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSetProfile}>
        <Text style={styles.buttonText}>Set Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E36607',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: 'white', // Ensure visibility if image fails to load
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 100,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#071D21',
  },
  genderText: {
    color: '#071D21',
  },
  genderTextSelected: {
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#071D21',
    borderRadius: 7,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
