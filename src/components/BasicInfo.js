import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BasicInfo = ({ onSave }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    birthday: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    onSave(userInfo);  // Save the updated info (send it to a parent component or API)
  };

  const handleBirthdayChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate || userInfo.birthday;
      setUserInfo({
        ...userInfo,
        birthday: currentDate,
        age: new Date().getFullYear() - currentDate.getFullYear(),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      {/* Editable Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
          placeholder="Enter your name"
        />
      </View>

      {/* Editable Age */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={userInfo.age.toString()}
          onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
      </View>

      {/* Editable Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={userInfo.location}
          onChangeText={(text) => setUserInfo({ ...userInfo, location: text })}
          placeholder="Enter your location"
        />
      </View>

      {/* Editable Bio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={userInfo.bio}
          onChangeText={(text) => setUserInfo({ ...userInfo, bio: text })}
          placeholder="Tell us about yourself"
          multiline
        />
      </View>

      {/* Editable Birthday */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birthday</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>
            {userInfo.birthday.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={userInfo.birthday}
                mode="date"
                display="default"
                onChange={handleBirthdayChange}
              />
              <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  datePickerButton: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3B5998',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BasicInfo;
 