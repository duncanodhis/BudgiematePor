// //utils/supabase.js
// import 'react-native-url-polyfill/auto';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
// const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// export const supabase = createClient(
//   SUPABASE_URL,
//   SUPABASE_ANON_KEY,
//   {
//     auth: {
//       storage: AsyncStorage,
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false,
//     },
//   }
// );
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Function to fetch user profile by user ID
export const fetchUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Function to update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};

// Function to update user preferences (like gender preference, age range, etc.)
export const updateUserPreferences = async (userId, preferencesData) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...preferencesData })
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return null;
  }
};

// Function to upload profile picture
export const uploadProfilePicture = async (userId, fileUri) => {
  try {
    const fileName = `${userId}/profile-pictures/${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, fileUri, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    // Update user's profile with the uploaded image URL
    const { publicURL, error: urlError } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName);

    if (urlError) {
      throw new Error(urlError.message);
    }

    // Update the user's profile with the new profile picture URL
    await updateUserProfile(userId, { profile_picture_url: publicURL });

    return publicURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return null;
  }
};

// Function to fetch user preferences
export const fetchUserPreferences = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
};

// Function to handle user login session
export const getSession = async () => {
  const session = supabase.auth.session();
  return session;
};

// Function to log out the user
export const logOut = async () => {
  await supabase.auth.signOut();
};
