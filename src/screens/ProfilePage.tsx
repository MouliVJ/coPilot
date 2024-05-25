import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(require('../Assets/image1.png')); // Default image
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const availableAvatars = [
    require('../Assets/image1.png'),
    require('../Assets/image2.png'),
    require('../Assets/image3.png'),
    require('../Assets/image4.png'),
  ];

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setIsModalVisible(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSetProfile = () => {
    // Implement profile setting logic here
    console.log('Profile set!');
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
            {availableAvatars.map((avatar, index) => (
              <TouchableOpacity key={index} onPress={() => handleImagePress(avatar)}>
                <Image source={avatar} style={styles.modalAvatar} />
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
