import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import LandingPage from './LandingPage';


const SignUpPage = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const route = useRoute();


    const handleSignUp = () => {
        // Perform sign-up logic here
        if (password === confirmPassword && termsChecked) {
            // Sign up the user
            Alert.alert('User signed up successfully!');
            console.log('User signed up successfully!');
        } else {
            // Show error message
            console.log('Please check your password and accept the terms and conditions.');
        }
    };

    return (
        <View>
            <Text>Your current username is {(route.params as { email?: string })?.email ?? ''}</Text>

            <Text onPress={() => navigation.navigate('LandingPage')}>Change</Text>

            <TextInput
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                secureTextEntry
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox value={termsChecked} onValueChange={setTermsChecked} />
                <Text>I accept the terms and conditions</Text>
            </View>
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpPage;