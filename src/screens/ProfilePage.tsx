import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '@env';
import { useId } from './utils/IdContext';

const ProfilePage = ({ navigation }) => {
  const { id, setId } = useId();
  const [selectedImage, setSelectedImage] = useState(require('../Assets/image1.png')); // Default image
  const [profileImage, setProfileImage] = useState("1"); // Default image identifier
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const route = useRoute();
  const email = (route.params as { email?: string })?.email ?? '';

  const availableAvatars = [
    { id: "1", source: require('../Assets/image1.png') },
    { id: "2", source: require('../Assets/image2.png') },
    { id: "3", source: require('../Assets/image3.png') },
    { id: "4", source: require('../Assets/image4.png') },
  ];

  const validateFields = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (firstName.trim() === '') {
      errorsCopy.firstName = 'First name is required';
      isValid = false;
    } else {
      errorsCopy.firstName = '';
    }

    if (lastName.trim() === '') {
      errorsCopy.lastName = 'Last name is required';
      isValid = false;
    } else {
      errorsCopy.lastName = '';
    }

    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/; // Change as per your validation requirements
    if (!phonePattern.test(phoneNumber)) {
      errorsCopy.phoneNumber = 'Invalid phone number';
      isValid = false;
    } else {
      errorsCopy.phoneNumber = '';
    }

    setErrors(errorsCopy);
    return isValid;
  };

  const handleImagePress = (image) => {
    setSelectedImage(image.source);
    setProfileImage(image.id);
    setIsModalVisible(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  }; 
  const handleSetProfile = () => {
    if (!validateFields()) {
      return;
    }

    const profileData = {
      id,
      profileImage,
      firstName,
      lastName,
      phoneNumber,
      gender
    };

    axios.post(`${API_URL}/setProfile`, {
      id,
      profileImage,
      firstName,
      lastName,
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
      {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSetProfile}>
        <Text style={styles.buttonText}>Set Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071D21',
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
    backgroundColor: '#071D21',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 100,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#E36607',
  },
  genderText: {
    color: 'white',
    fontFamily: 'Satoshi',
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
    fontFamily: 'Satoshi'
  },
  button: {
    backgroundColor: '#E36607',
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
    fontFamily: 'Satoshi',
    fontSize: 20,
  },

  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Satoshi',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  }
});

export default ProfilePage;
