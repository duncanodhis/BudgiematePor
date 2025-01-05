import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MotiView } from 'moti';
import Slider from '@react-native-community/slider';
import { useUserInfo } from '../contexts/UserInfoContext';
import { updateUserPreference } from '../services/ProfileService';

const PreferencesScreen = ({ navigation }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const { userInfo, setUserInfo } = useUserInfo();
  const [preferences, setPreferences] = useState({
    min_age: 25,
    max_age: 35,
    distance: '25',
    interests: '',
    looking_for: '',
    min_budget: 0,
    max_budget: 1000,
    split_preference: 'equal'
  });

  const relationshipTypes = [
    { value: 'casual', icon: 'coffee', label: 'Casual Dating', desc: 'Taking things slow and easy' },
    { value: 'serious', icon: 'heart', label: 'Serious Relationship', desc: 'Looking for long-term commitment' },
    { value: 'friends', icon: 'users', label: 'New Friends', desc: 'Starting with friendship' },
  ];

  const splitPreferences = [
    { value: 'equal', label: 'Split Equally' },
    { value: 'proportional', label: 'Split Proportionally' },
    { value: 'alternate', label: 'Take Turns' }
  ];

  const interestOptions = [
    'Movies', 'Music', 'Food', 'Travel', 'Sports', 'Art',
    'Reading', 'Gaming', 'Fitness', 'Photography'
  ];

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleInterestToggle = (interest) => {
    const currentInterests = preferences.interests ? preferences.interests.split(',') : [];
    let newInterests;
    
    if (currentInterests.includes(interest)) {
      newInterests = currentInterests.filter(i => i !== interest);
    } else {
      newInterests = [...currentInterests, interest];
    }
    
    setPreferences(prev => ({
      ...prev,
      interests: newInterests.join(',')
    }));
  };

  const handleSave = async () => {
    try {
       // Get the current timestamp
    const now = new Date().toISOString();
    const { profile, error } = await updateUserPreference(userInfo.id, {
      id: Date.now(), // Generate a unique bigint ID using timestamp
      user_id: userInfo.id,
      min_budget: preferences.min_budget,
      max_budget: preferences.max_budget,
      split_preference: preferences.split_preference,
      created_at: now,
      updated_at: now,
      min_age: preferences.min_age,
      max_age: preferences.max_age,
      looking_for: preferences.looking_for,
      distance: preferences.distance.toString(),
      interests: preferences.interests
    });


      if (error) throw error;

      setUserInfo({
        ...userInfo,
        preferences: profile,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: slideAnimation,
            transform: [{
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
        <View style={styles.headerContainer}>
          <MotiView
            from={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <FontAwesome5 name="heart" size={24} color="#FF6B6B" />
          </MotiView>
          <Text style={styles.title}>Your Preferences</Text>
        </View>

        <View style={styles.card}>
          {/* Age Range Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age Range</Text>
            <View style={styles.ageContainer}>
              <Text style={styles.ageValue}>
                {preferences.min_age} - {preferences.max_age} years
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={100}
                step={1}
                value={preferences.max_age}
                onValueChange={(value) =>
                  setPreferences(prev => ({
                    ...prev,
                    max_age: value
                  }))
                }
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E1E4E8"
                thumbTintColor="#FF6B6B"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Budget Range Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget Range</Text>
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetValue}>
                ${preferences.min_budget} - ${preferences.max_budget}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5000}
                step={100}
                value={preferences.max_budget}
                onValueChange={(value) =>
                  setPreferences(prev => ({
                    ...prev,
                    max_budget: value
                  }))
                }
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E1E4E8"
                thumbTintColor="#FF6B6B"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Split Preference Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Split Preference</Text>
            <View style={styles.optionsWrapper}>
              {splitPreferences.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    preferences.split_preference === option.value && styles.optionSelected,
                  ]}
                  onPress={() => setPreferences(prev => ({ ...prev, split_preference: option.value }))}
                >
                  <Text
                    style={[
                      styles.optionText,
                      preferences.split_preference === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Distance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maximum Distance</Text>
            <Text style={styles.distanceValue}>{preferences.distance} miles</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={parseInt(preferences.distance)}
              onValueChange={(value) =>
                setPreferences(prev => ({ ...prev, distance: value.toString() }))
              }
              minimumTrackTintColor="#FF6B6B"
              maximumTrackTintColor="#E1E4E8"
              thumbTintColor="#FF6B6B"
            />
          </View>

          <View style={styles.divider} />

          {/* Looking For Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What are you looking for?</Text>
            <View style={styles.optionsWrapper}>
              {relationshipTypes.map((option, index) => (
                <MotiView
                  key={option.value}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'timing',
                    duration: 600,
                    delay: index * 200,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.option,
                      preferences.looking_for === option.value && styles.optionSelected,
                    ]}
                    onPress={() => setPreferences(prev => ({ ...prev, looking_for: option.value }))}
                  >
                    <FontAwesome5
                      name={option.icon}
                      size={20}
                      color={preferences.looking_for === option.value ? '#fff' : '#666'}
                    />
                    <Text
                      style={[
                        styles.optionText,
                        preferences.looking_for === option.value && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.optionDesc,
                        preferences.looking_for === option.value && styles.optionDescSelected,
                      ]}
                    >
                      {option.desc}
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Interests Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Interests</Text>
            <View style={styles.interestsContainer}>
              {interestOptions.map((interest, index) => (
                <MotiView
                  key={interest}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'timing',
                    duration: 400,
                    delay: index * 100,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.interestChip,
                      preferences.interests.includes(interest) && styles.interestChipSelected,
                    ]}
                    onPress={() => handleInterestToggle(interest)}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        preferences.interests.includes(interest) && styles.interestTextSelected,
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginLeft: 12,
    color: '#333',
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ageContainer: {
    marginBottom: 8,
  },
  ageValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  distanceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F2F5',
    marginVertical: 24,
    borderRadius: 1,
  },
  optionsWrapper: {
    gap: 16,
  },
  option: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: '#FF6B6B',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  optionDesc: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
  optionDescSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  interestChipSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  interestText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  interestTextSelected: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  budgetContainer: {
    marginBottom: 8,
  },
  budgetValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 8,
  },
});

export default PreferencesScreen;