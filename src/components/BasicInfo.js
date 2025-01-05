import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Button,
  Animated,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const BasicInfo = ({ onSave }) => {
  // Enhanced state with gender preferences
  const [userInfo, setUserInfo] = useState({
    name: '',
    location: '',
    bio: '',
    birthday: new Date(),
    genderIdentity: '',
    interestedIn: [],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Gender options
  const genderIdentityOptions = [
    'Man', 'Woman', 'Non-binary', 'Other'
  ];

  const interestOptions = [
    'Men', 'Women', 'Non-binary people', 'Everyone'
  ];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleBirthdayChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUserInfo(prev => ({
        ...prev,
        birthday: selectedDate,
      }));
    }
  };

  const handleInterestToggle = (interest) => {
    setUserInfo(prev => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(interest)
        ? prev.interestedIn.filter(i => i !== interest)
        : [...prev.interestedIn, interest]
    }));
  };

  const formatBirthdayDisplay = () => {
    const age = calculateAge(userInfo.birthday);
    const dateString = userInfo.birthday.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return `${dateString} (${age} years old)`;
  };

  const renderInputField = (label, value, onChangeText, props = {}) => (
    <Animated.View style={[
      styles.inputContainer,
      {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }
    ]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        {...props}
      />
    </Animated.View>
  );

  // Determine if user is 18 or older
  const isAdult = calculateAge(userInfo.birthday) >= 18;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {renderInputField(
        "What's your name?",
        userInfo.name,
        (text) => setUserInfo({ ...userInfo, name: text }),
        { placeholder: "Enter your name" }
      )}

      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <Text style={styles.label}>When's your birthday?</Text>
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)} 
          style={styles.datePickerButton}
        >
          <Text style={[
            styles.datePickerButtonText,
            !isAdult && styles.datePickerButtonTextError
          ]}>
            {formatBirthdayDisplay()}
          </Text>
          <MaterialIcons name="date-range" size={24} color="#666" />
        </TouchableOpacity>
        {!isAdult && (
          <Text style={styles.errorText}>
            You must be 18 or older to use this app
          </Text>
        )}
      </Animated.View>

      {renderInputField(
        "Where are you located?",
        userInfo.location,
        (text) => setUserInfo({ ...userInfo, location: text }),
        { placeholder: "Enter your location" }
      )}

      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <Text style={styles.label}>I identify as...</Text>
        <View style={styles.optionsContainer}>
          {genderIdentityOptions.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.optionButton,
                userInfo.genderIdentity === gender && styles.optionButtonSelected
              ]}
              onPress={() => setUserInfo({ ...userInfo, genderIdentity: gender })}
            >
              <Text style={[
                styles.optionButtonText,
                userInfo.genderIdentity === gender && styles.optionButtonTextSelected
              ]}>
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <Text style={styles.label}>Interested in...</Text>
        <View style={styles.optionsContainer}>
          {interestOptions.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                styles.optionButton,
                userInfo.interestedIn.includes(interest) && styles.optionButtonSelected
              ]}
              onPress={() => handleInterestToggle(interest)}
            >
              <Text style={[
                styles.optionButtonText,
                userInfo.interestedIn.includes(interest) && styles.optionButtonTextSelected
              ]}>
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {renderInputField(
        "About me",
        userInfo.bio,
        (text) => setUserInfo({ ...userInfo, bio: text }),
        {
          placeholder: "Share a little about yourself...",
          multiline: true,
          numberOfLines: 4,
        }
      )}

      <TouchableOpacity 
        style={[
          styles.saveButton,
          !isAdult && styles.saveButtonDisabled
        ]} 
        onPress={() => isAdult && onSave(userInfo)}
        disabled={!isAdult}
      >
        <Text style={styles.saveButtonText}>Continue</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={userInfo.birthday}
                mode="date"
                display="default"
                onChange={handleBirthdayChange}
                maximumDate={new Date()}
              />
              <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
    marginTop: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#333',
  },
  multilineInput: {
    height: 120,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  datePickerButtonTextError: {
    color: '#FF4B67',
  },
  errorText: {
    color: '#FF4B67',
    fontSize: 14,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F8F8F8',
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#FF4B67',
    borderColor: '#FF4B67',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666',
  },
  optionButtonTextSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FF4B67',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonDisabled: {
    backgroundColor: '#FFB5C0',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BasicInfo;