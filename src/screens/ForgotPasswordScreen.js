import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabase } from '../utils/supabase'; // Import the supabase client
import { resetPassword, updatePassword } from '../services/AuthService'; // Adjust the import path if needed

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email address',
      });
      return;
    }

    const { error } = await resetPassword(email);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send reset instructions. Please try again.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset instructions have been sent to your email',
      });
      setIsPasswordReset(true);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your new password',
      });
      return;
    }

    const { error } = await updatePassword(newPassword);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update password. Please try again.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password updated successfully!',
      });
      navigation.navigate('login');
    }
  };

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsPasswordReset(true);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      {!isPasswordReset ? (
        <>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Enter your new password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#3B5998',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#3B5998',
  },
});

export default ForgotPasswordScreen;