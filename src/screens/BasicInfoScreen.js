import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert, 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useUserInfo } from '../contexts/UserInfoContext';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/ProfileService';
const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#3B5998',
  secondary: '#8B9DC3',
  accent: '#DFE3EE',
  text: '#333333',
  error: '#FF4B67',
  background: '#FFFFFF',
  inputBg: '#F8F8F8',
  border: '#E8E8E8',
  placeholder: '#999999',
  success: '#4CD964',
};

const genderIdentityOptions = ['Man', 'Woman', 'Non-binary', 'Other'];
const interestOptions = ['Men', 'Women', 'Non-binary people', 'Everyone'];

const AnimatedSection = ({ children, delay, style }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const SelectableOption = ({ label, selected, onPress, multiSelect = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.optionButton,
      selected && styles.selectedOption,
    ]}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.optionText,
      selected && styles.selectedOptionText
    ]}>
      {label}
    </Text>
    {multiSelect && selected && (
      <MaterialIcons 
        name="check" 
        size={20} 
        color={COLORS.background} 
        style={styles.checkIcon}
      />
    )}
  </TouchableOpacity>
);

const BasicInfoScreen = ({ navigation }) => {
  const { userInfo, setUserInfo } = useUserInfo();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Form state
  const [name, setName] = useState(userInfo?.name || '');
  const [birthday, setBirthday] = useState(userInfo?.birthday || null);
  const [gender, setGender] = useState(userInfo?.genderIdentity || '');
  const [interests, setInterests] = useState(userInfo?.interests || []);
  const [bio, setBio] = useState(userInfo?.bio || '');
  const [location, setLocation] = useState(userInfo?.location || '');
  const searchTimeout = useRef(null);
  const {user } = useAuth();
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant location permissions to use this feature.'
      );
    }
  };

  const handleLocationSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5`
        );
        const data = await response.json();
        setSearchResults(data.map(item => ({
          id: item.place_id,
          name: item.display_name,
          lat: item.lat,
          lon: item.lon,
        })));
      } catch (error) {
        console.error('Location search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
      validateField('birthday', selectedDate);
    }
  };
  const searchLocations = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'BasicInfoApp', 
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.map(item => ({
        id: item.place_id,
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      })));
    } catch (error) {
      console.error('Location search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const validateField = (field, value) => {
    const newErrors = { ...formErrors };
    
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          newErrors.name = 'Name is required (minimum 2 characters)';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'birthday':
        if (!value) {
          newErrors.birthday = 'Birthday is required';
        } else {
          const age = calculateAge(value);
          if (age < 18) {
            newErrors.birthday = 'You must be 18 or older';
          } else {
            delete newErrors.birthday;
          }
        }
        break;
      
      case 'gender':
        if (!value) {
          newErrors.gender = 'Please select your gender identity';
        } else {
          delete newErrors.gender;
        }
        break;
      
      case 'interests':
        if (!value || value.length === 0) {
          newErrors.interests = 'Please select at least one interest';
        } else {
          delete newErrors.interests;
        }
        break;
      
      case 'location':
        if (!value) {
          newErrors.location = 'Location is required';
        } else {
          delete newErrors.location;
        }
        break;
      
      case 'bio':
        if (!value || value.trim().length < 10) {
          newErrors.bio = 'Please write at least 10 characters about yourself';
        } else {
          delete newErrors.bio;
        }
        break;
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleInterestToggle = (interest) => {
    const newInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    setInterests(newInterests);
    validateField('interests', newInterests);
  };

  const handleSubmit = async () => {
    // Validate all fields
    const fieldsValid = [
      validateField('name', name),
      validateField('birthday', birthday),
      validateField('gender', gender),
      validateField('interests', interests),
      validateField('location', location),
      validateField('bio', bio),
    ].every(Boolean);
  
    if (!fieldsValid) {
      // Scroll to the first error if validation fails
      const firstError = Object.keys(formErrors)[0];
      return;
    }
  
    try {
      // Transform the data into the format expected by the database
      const profileData = {
        name,
        bio,
        birthday: birthday.toISOString(),
        location,
        gender_identity: gender,
        age: calculateAge(birthday),
        interested_in: interests,
      };
  
      // Use the existing userInfo variable
      const userId = user.id; // Ensure this matches how you store the user ID
  
      // Update the profile in the database
      const { profile, error } = await updateUserProfile(userId, profileData);
  
      if (error) {
        console.error('Error updating profile:', error);
        Alert.alert(
          'Error',
          'There was a problem saving your profile. Please try again.'
        );
        return;
      }
  
      // Update local context
      setUserInfo({
        ...userInfo,
        ...profileData,
      });
  
      // Navigate to the next screen on success
      navigation.navigate('PhotoUpload');
    } catch (error) {
      console.error('Error in profile submission:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again.'
      );
    }
  };
  
  // Location Modal Component
  const LocationSearchModal = ({
    locationSearch,
    setLocationSearch,
    setLocation,
    setShowLocationModal,
  }) => (
    <Modal
      visible={showLocationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowLocationModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Search Location</Text>
            <TouchableOpacity
              onPress={() => setShowLocationModal(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.modalInput}
              placeholder="Search for your location"
              value={locationSearch}
              onChangeText={(text) => {
                setLocationSearch(text); // Update text immediately
                if (searchTimeout.current) clearTimeout(searchTimeout.current);
                searchTimeout.current = setTimeout(() => searchLocations(text), 500); // Debounce API call
              }}
              placeholderTextColor={COLORS.placeholder}
              autoFocus={true} // Ensure the input is focused when the modal opens
            />
            {isSearching && (
              <ActivityIndicator
                style={styles.searchIndicator}
                color={COLORS.primary}
              />
            )}
          </View>
  
          <ScrollView
            style={styles.searchResults}
            keyboardShouldPersistTaps="handled"
          >
            {searchResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.searchResultItem}
                onPress={() => {
                  setLocation(item.name);
                  setLocationSearch(item.name);
                  validateField('location', item.name);
                  setShowLocationModal(false);
                }}
              >
                <Text style={styles.searchResultText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AnimatedSection delay={0} style={styles.headerSection}>
          <Text style={styles.subtitle}>Let's get to know you better</Text>
        </AnimatedSection>

        <AnimatedSection delay={150} style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, formErrors.name && styles.inputError]}
              placeholder="Your name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                validateField('name', text);
              }}
              placeholderTextColor={COLORS.placeholder}
            />
            {formErrors.name && (
              <Text style={styles.errorText}>{formErrors.name}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.input, formErrors.birthday && styles.inputError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={birthday ? styles.inputText : styles.placeholderText}>
              {birthday 
                ? new Date(birthday).toLocaleDateString()
                : 'Your birthday'}
            </Text>
          </TouchableOpacity>
          {formErrors.birthday && (
            <Text style={styles.errorText}>{formErrors.birthday}</Text>
          )}
        </AnimatedSection>

        <AnimatedSection delay={300} style={styles.section}>
          <Text style={styles.sectionTitle}>Gender Identity</Text>
          <View style={styles.optionsGrid}>
            {genderIdentityOptions.map((option) => (
              <SelectableOption
                key={option}
                label={option}
                selected={gender === option}
                onPress={() => {
                  setGender(option);
                  validateField('gender', option);
                }}
              />
            ))}
          </View>
          {formErrors.gender && (
            <Text style={styles.errorText}>{formErrors.gender}</Text>
          )}
        </AnimatedSection>

        <AnimatedSection delay={450} style={styles.section}>
          <Text style={styles.sectionTitle}>Interested In</Text>
          <View style={styles.optionsGrid}>
            {interestOptions.map((option) => (
              <SelectableOption
                key={option}
                label={option}
                selected={interests.includes(option)}
                onPress={() => handleInterestToggle(option)}
                multiSelect
              />
            ))}
          </View>
          {formErrors.interests && (
            <Text style={styles.errorText}>{formErrors.interests}</Text>
          )}
        </AnimatedSection>

        <AnimatedSection delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={[styles.input, formErrors.location && styles.inputError]}
            onPress={() => setShowLocationModal(true)}
          >
            <Text style={location ? styles.inputText : styles.placeholderText}>
              {location || 'Where are you based?'}
            </Text>
            <MaterialIcons 
              name="search" 
              size={20} 
              color={COLORS.placeholder} 
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          {formErrors.location && (
            <Text style={styles.errorText}>{formErrors.location}</Text>
          )}
        </AnimatedSection>

        <AnimatedSection delay={750} style={styles.section}>
          <Text style={styles.sectionTitle}>About You</Text>
          <TextInput
            style={[styles.bioInput, formErrors.bio && styles.inputError]}
            placeholder="Share a little about yourself..."
            value={bio}
            onChangeText={(text) => {
              setBio(text);
              validateField('bio', text);
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.placeholder}
          />
          {formErrors.bio && (
            <Text style={styles.errorText}>{formErrors.bio}</Text>
          )}
        </AnimatedSection>

        <View style={styles.spacer} />
      </ScrollView>

      <AnimatedSection delay={900} style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </AnimatedSection>

      {showDatePicker && (
        <DateTimePicker
          value={birthday || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {showLocationModal && (
    <LocationSearchModal
      locationSearch={locationSearch}
      setLocationSearch={setLocationSearch}
      setLocation={setLocation}
      setShowLocationModal={setShowLocationModal}
    />
  )}

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: COLORS.inputBg,
    fontSize: 16,
    marginBottom: 8,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputText: {
    color: COLORS.text,
    fontSize: 16,
  },
  placeholderText: {
        color: COLORS.placeholder,
        fontSize: 16,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 6,
        minWidth: width / 2 - 40,
        backgroundColor: COLORS.inputBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    optionText: {
        fontSize: 15,
        color: COLORS.text,
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: COLORS.background,
    },
    checkIcon: {
        marginLeft: 8,
    },
    bioInput: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 16,
        backgroundColor: COLORS.inputBg,
        fontSize: 16,
        height: 120,
        textAlignVertical: 'top',
    },
    errorText: {
        color: COLORS.error,
        fontSize: 13,
        marginTop: 4,
        marginLeft: 4,
    },
    searchIndicator: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    searchResults: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        maxHeight: 200,
        zIndex: 1000,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    searchResultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    searchResultText: {
        fontSize: 14,
        color: COLORS.text,
    },
    bottomContainer: {
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        color: COLORS.background,
        fontSize: 16,
        fontWeight: '600',
    },
    spacer: {
        height: 100,
    }, modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: COLORS.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
    },
    closeButton: {
      padding: 5,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      padding: 16,
      backgroundColor: COLORS.inputBg,
      fontSize: 16,
    },
    searchResults: {
      maxHeight: '70%',
    },
    searchIcon: {
      position: 'absolute',
      right: 15,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
});

export default BasicInfoScreen;