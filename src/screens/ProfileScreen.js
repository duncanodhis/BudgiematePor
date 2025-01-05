import React, { useState, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import BudgetPreferences from '../components/BudgetPreferences';
import InterestTags from '../components/InterestTags';
import PhotoUpload from '../components/PhotoUpload';
import ProfileCompletion from '../components/ProfileCompletion';
import VerificationBadge from '../components/VerificationBadge';
import BasicInfo from '../components/BasicInfo';
import { getUserProfile, updateUserProfile } from '../services/ProfileService';
import { getUser , AuthError} from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
 
// Create a wrapper component for Toast that uses forwardRef
const ToastWrapper = forwardRef((props, ref) => {
  return <Toast {...props} ref={ref} />;
});

const ProfileScreen = () => {
  const { user } = useAuth(); 
  const navigation = useNavigation();
  const [preferences, setPreferences] = useState({
    minBudget: 0,
    maxBudget: 500,
    splitPreference: 'equal',
  });
  const [photos, setPhotos] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleAuthError = (error) => {
    if (error === AuthError.SESSION_MISSING) {
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please log in again to continue.',
      });
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
      return true;
    }
    return false;
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user) {
          throw new Error('No user found');
        }

        const { profile, error: profileError } = await getUserProfile(user.id);
        if (profileError) throw new Error(profileError);

        if (profile) {
          setUserInfo(profile);
          setPreferences(profile.preferences || preferences);
          setPhotos(profile.photos || []);
          setSelectedTags(profile.selectedTags || []);
          setIsVerified(profile.isVerified || false);
        }
      } catch (error) {
        console.error('Error in profile fetch:', error);
        
        const errorMessage = {
          'No user found': 'Please log in to view your profile.',
          'No user profile found': 'Please complete your profile.',
        }[error.message] || 'Error loading profile. Please try again.';

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);
  const handleSave = async (updatedInfo) => {
    try {
      if (!user) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please log in to update your profile.',
        });
        navigation.navigate('Login');
        return;
      }
  
      const { profile, error: updateError } = await updateUserProfile(user.id, {
        ...updatedInfo,
        preferences,
        photos,
        selectedTags,
        isVerified,
      });
  
      if (updateError) throw new Error(updateError);
  
      setUserInfo(profile);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully.',
      });
    } catch (error) {
      console.error('Error in profile update:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update profile. Please try again.',
      });
    }
  };
  const handlePreferencesUpdate = (updatedPreferences) => {
    setPreferences(updatedPreferences);
  };

  const handleTagsUpdate = (updatedTags) => {
    setSelectedTags(updatedTags);
  };

  const handlePhotosUpdate = (updatedPhotos) => {
    setPhotos(updatedPhotos);
  };

  const calculateProfileCompletion = () => {
    let completion = 0;
    if (preferences.minBudget && preferences.maxBudget) completion += 33;
    if (selectedTags.length > 0) completion += 33;
    if (photos.length > 0) completion += 34;
    return completion;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
       {/* {user && <Text style={styles.text}>Logged in as: {user.email}</Text>} */}
      <PhotoUpload photos={photos} onPhotosUpdate={handlePhotosUpdate} maxPhotos={6} />
      <ProfileCompletion percentage={calculateProfileCompletion()} />
      <BasicInfo userInfo={userInfo} onSave={handleSave} />

      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Name: {userInfo.name}</Text>
          <Text style={styles.userInfoText}>Age: {userInfo.age}</Text>
          <Text style={styles.userInfoText}>Location: {userInfo.location}</Text>
          <Text style={styles.userInfoText}>Bio: {userInfo.bio}</Text>
          <Text style={styles.userInfoText}>Birthday: {new Date(userInfo.birthday).toLocaleDateString()}</Text>
        </View>
      )}

      <BudgetPreferences preferences={preferences} onPreferencesUpdate={handlePreferencesUpdate} />
      <InterestTags selectedTags={selectedTags} onTagsUpdate={handleTagsUpdate} />

      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={() => userInfo && handleSave(userInfo)}
        />
      </View>
      <ToastWrapper />
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
    backgroundColor: '#3B5998',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ProfileScreen;