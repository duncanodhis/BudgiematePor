import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/AuthService'; 

   
const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  
    const handleSignup = async () => {
      if (!email || !password || !confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please fill in all fields.',
        });
        return;
      }
  
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Passwords do not match.',
        });
        return;
      }
  
      if (password.length < 8) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Password must be at least 8 characters long.',
        });
        return;
      }
  
      setLoading(true);
  
      try {
        const { user, error } = await signUp(email, password);
  
        if (error) {
          Toast.show({
            type: 'error',
            text1: 'Signup Failed',
            text2: error.message || 'Please try again later.',
          });
          setLoading(false);
          return;
        }
  
        if (user) {
          // Notify the user about the confirmation email
          Toast.show({
            type: 'info',
            text1: 'Check Your Email',
            text2: 'We’ve sent a confirmation email. Please verify your email address.',
          });
  
          // Simulate waiting for email confirmation
          setTimeout(() => {
            Toast.show({
              type: 'success',
              text1: 'Email Confirmed',
              text2: 'Your email has been confirmed. Redirecting to login...',
            });
  
            // Navigate to login after email confirmation
            navigation.navigate('Login');
          }, 5000); // Replace this with actual email confirmation logic if applicable
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
          text2: 'Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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


  export default SignupScreen;
