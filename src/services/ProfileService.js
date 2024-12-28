// service/profileService.js

import {
  fetchUserProfile,
  updateUserProfile,
  updateUserPreferences,
  uploadProfilePicture,
  fetchUserPreferences,
} from '../utils/supabase';

// Service to handle user profile logic
class ProfileService {
  // Fetch user profile by ID
  static async getUserProfile(userId) {
    try {
      const profile = await fetchUserProfile(userId);
      return profile;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      throw error;
    }
  }

  // Update user profile information
  static async updateProfile(userId, profileData) {
    try {
      const updatedProfile = await updateUserProfile(userId, profileData);
      return updatedProfile;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  }

  // Update user preferences
  static async updatePreferences(userId, preferencesData) {
    try {
      const updatedPreferences = await updateUserPreferences(userId, preferencesData);
      return updatedPreferences;
    } catch (error) {
      console.error("Error in updatePreferences:", error);
      throw error;
    }
  }

  // Upload profile picture and update user profile with the image URL
  static async updateProfilePicture(userId, fileUri) {
    try {
      const imageUrl = await uploadProfilePicture(userId, fileUri);
      return imageUrl;
    } catch (error) {
      console.error("Error in updateProfilePicture:", error);
      throw error;
    }
  }

  // Fetch user preferences
  static async getUserPreferences(userId) {
    try {
      const preferences = await fetchUserPreferences(userId);
      return preferences;
    } catch (error) {
      console.error("Error in getUserPreferences:", error);
      throw error;
    }
  }
}

export default ProfileService;
