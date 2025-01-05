// src/services/authService.js

import { supabase } from '../utils/supabase'; // Adjust the import path if needed
export const AuthError = {
  SESSION_MISSING: 'AUTH_SESSION_MISSING',
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  NETWORK_ERROR: 'AUTH_NETWORK_ERROR',
};

export const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { user: data.user, error };
  } catch (error) {
    console.error("Error during sign-up:", error);
    return { user: null, error };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data.user, error };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return { user: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error("Error during sign-out:", error);
    return { error };
  }
};


export const getUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error(AuthError.SESSION_MISSING);
    }
    
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    return { user, error: null };
  } catch (error) {
    console.error("Error in getUser:", error);
    return {
      user: null,
      error: error.message || AuthError.NETWORK_ERROR
    };
  }
};

export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'yourapp://reset-password', // Adjust the redirect URL as needed
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { data: null, error };
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating password:", error);
    return { data: null, error };
  }
};