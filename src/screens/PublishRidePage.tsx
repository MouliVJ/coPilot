import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { API_URL } from '@env';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

const PublishRidePage = () => {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [data, setData] = useState([]);
  const route = useRoute();
  const id = (route.params as { id?: string })?.id ?? '';
  const vechileId = (route.params as { vechileId?: string })?.vechileId ?? '';
  
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
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSearch = () => {
    // Combine date and time while keeping the local time zone
    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const requestBody = {
        id: id,
        vechileId: vechileId,
      from: selectedFrom,
      to: selectedTo,
      dateTime: combinedDateTime.toISOString(), // Keep in local time zone before converting to ISO string
    };
    console.log('Request:', requestBody);
    axios.post(`${API_URL}/publishRide`, requestBody)
        .then(response => {
        console.log('Response:', response.data);
        })
        .catch(error => {
        console.error('Error:', error);
        });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
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
        </View>
        <Text style={styles.title}>To</Text>
        <View style={styles.selectList}>
          <SelectList 
            setSelected={handleToSelect} 
            data={data} 
            save="value"
          />
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
});
