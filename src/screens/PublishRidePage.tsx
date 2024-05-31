import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { API_URL } from '@env';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { useId } from './utils/IdContext';

const PublishRidePage = ({ navigation }) => {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [data, setData] = useState([]);
  const route = useRoute();
  const [fromError, setFromError] = useState('');
  const [toError, setToError] = useState('');
  const id = useId().id;
  const vehicleId = (route.params as { selectedVehicleId?: string })?.selectedVehicleId ?? '';
  console.log('ID:', id);
  useEffect(() => {
    axios.get(`${API_URL}/getNodalPoints`)
      .then(response => {
        const formattedData = response.data.map((value, index) => ({ key: index.toString(), value }));
        setData(formattedData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFromSelect = (val) => {
    setSelectedFrom(val);
    console.log('Selected From:', val);
  };

  const handleToSelect = (val) => {
    setSelectedTo(val);
    console.log('Selected To:', val);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      setTime(selectedTime);
    }
    setShowTimePicker(false);
  };

  const toIST = (date) => {
    const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    return new Date(date.getTime() + offset);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleSearch = () => {
    setFromError('');
    setToError('');
    console.log('Selected From:', selectedFrom);
    console.log('Selected To:', selectedTo);

    if (selectedFrom === selectedTo) {
      setToError('To location should be different from From location');
      return;
    }
    if (!selectedFrom && !selectedTo) {
      setFromError('At least one location should be selected');
      setToError('At least one location should be selected');
      return;
    }
    if (selectedFrom.localeCompare('Office', undefined, { sensitivity: 'base' }) !== 0 && selectedTo.localeCompare('Office', undefined, { sensitivity: 'base' }) !== 0) {
      setToError('At least one location should be "Office"');
      return;
    }

    // Combine date and time in IST
    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const combinedDateTimeIST = toIST(combinedDateTime);
    if (combinedDateTime < new Date()) {
      Alert.alert('Invalid Date/Time', 'Please select a future date and time.');
      return;
    }

    const rider = {
      userId: id,
      vehicleId: vehicleId.toString(),
      from: selectedFrom,
      to: selectedTo,
      dateTime: combinedDateTimeIST.toISOString(), // Ensure the ISO string is in IST
    };

    console.log('Publish ride Request:', rider);

    axios.post(`${API_URL}/publishRide`, rider)
      .then(response => {
        console.log('Response:', response.data);
        Alert.alert('Ride Published Successfully');
        navigation.navigate('HomePage');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fromTo}>
        <Text style={styles.title}>From</Text>
        <View style={styles.selectList}>
          <SelectList
            setSelected={handleFromSelect}
            data={data}
            save="value"
          />
          {fromError ? <Text style={styles.errorText}>{fromError}</Text> : null}
        </View>
        <Text style={styles.title}>To</Text>
        <View style={styles.selectList}>
          <SelectList
            setSelected={handleToSelect}
            data={data}
            save="value"
          />
          {toError ? <Text style={styles.errorText}>{toError}</Text> : null}
        </View>
        <Text style={styles.title}>Date</Text>
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={formatDate(date)}
            editable={false}
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Text style={styles.title}>Time</Text>
        <Pressable onPress={toggleTimePicker}>
          <TextInput
            style={styles.input}
            placeholder="Select Time"
            value={formatTime(time)}
            editable={false}
          />
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PublishRidePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071D21',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  fromTo: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  selectList: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
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
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
