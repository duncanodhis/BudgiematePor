import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfo } from '../contexts/UserInfoContext';
import PhotoUpload from '../components/PhotoUpload';
import { updateProfilePhoto } from '../services/ProfileService';

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

const PhotosScreen = () => {
  const [photos, setPhotos] = useState([]);
  const { userInfo, setUserInfo } = useUserInfo();
  const navigation = useNavigation();

  const handleNext = () => {
    setUserInfo({
      ...userInfo,
      photos: photos,
    });
    navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Upload Your Photos</Text>
              <Text style={styles.subHeader}>
                Add up to 6 photos to your profile
              </Text>
            </View>

            <View style={styles.uploadContainer}>
              <PhotoUpload
                photos={photos}
                onPhotosUpdate={setPhotos}
                maxPhotos={6}
              />
            </View>
          </View>
        </ScrollView>

        {/* Fixed bottom button container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              photos.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={handleNext}
            disabled={photos.length === 0}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: COLORS.placeholder,
  },
  uploadContainer: {
    flex: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.accent,
  },
  continueButtonText: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PhotosScreen;
