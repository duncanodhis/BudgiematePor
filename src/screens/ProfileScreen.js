import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import BudgetPreferences from '../components/BudgetPreferences';
import InterestTags from '../components/InterestTags';
import PhotoUpload from '../components/PhotoUpload';
import ProfileCompletion from '../components/ProfileCompletion';
import VerificationBadge from '../components/VerificationBadge';
import BasicInfo from '../components/BasicInfo';

const ProfileScreen = () => {
  const [preferences, setPreferences] = useState({
    minBudget: 0,
    maxBudget: 500,
    splitPreference: 'equal',
  });
  const [photos, setPhotos] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleSave = (updatedInfo) => {
    setUserInfo(updatedInfo);
    console.log('Updated user info:', updatedInfo);
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setPreferences(updatedPreferences);
    console.log('Updated preferences:', updatedPreferences);
  };

  const handleTagsUpdate = (updatedTags) => {
    setSelectedTags(updatedTags);
    console.log('Updated tags:', updatedTags);
  };

  const handlePhotosUpdate = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    console.log('Updated photos:', updatedPhotos);
  };

  const handleVerificationComplete = () => {
    setIsVerified(true);
    console.log('Verification completed');
  };

  const calculateProfileCompletion = () => {
    let completion = 0;
    if (preferences.minBudget && preferences.maxBudget) completion += 33;
    if (selectedTags.length > 0) completion += 33;
    if (photos.length > 0) completion += 34;
    return completion;
  };

  const profileCompletionPercentage = calculateProfileCompletion();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Photo Upload */}
      <PhotoUpload photos={photos} onPhotosUpdate={handlePhotosUpdate} maxPhotos={6} />

      {/* Profile Completion */}
      <ProfileCompletion percentage={profileCompletionPercentage} />

      {/* Basic Information */}
      <BasicInfo onSave={handleSave} />

      {/* User Info Display */}
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Name: {userInfo.name}</Text>
          <Text style={styles.userInfoText}>Age: {userInfo.age}</Text>
          <Text style={styles.userInfoText}>Location: {userInfo.location}</Text>
          <Text style={styles.userInfoText}>Bio: {userInfo.bio}</Text>
          <Text style={styles.userInfoText}>Birthday: {userInfo.birthday.toLocaleDateString()}</Text>
        </View>
      )}

      {/* Budget Preferences */}
      <BudgetPreferences preferences={preferences} onPreferencesUpdate={handlePreferencesUpdate} />

      {/* Interest Tags */}
      <InterestTags selectedTags={selectedTags} onTagsUpdate={handleTagsUpdate} />

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={() =>
            console.log({
              preferences,
              photos,
              selectedTags,
              isVerified,
              userInfo,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  userInfoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#3B5998', // matching color with the rest of the UI
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ProfileScreen;
